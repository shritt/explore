import {
  app,
  shell,
  BrowserWindow,
  ipcMain,
  WebContentsView,
  globalShortcut,
  session
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import pngIcon from '../../resources/icon.png?asset'
import icoIcon from '../../resources/icon.ico?asset'
import icnsIcon from '../../resources/icon.icns?asset'
import Store from '../utils/Store'

const userPreferences = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 1200, height: 800 },
    settings: { maximized: false }
  }
})

let mainWindow = null
let isSidebarOpen = true

let tabs = []
let currentTab = 0

function createWindow() {
  mainWindow = new BrowserWindow({
    width: userPreferences.get('windowBounds').width,
    height: userPreferences.get('windowBounds').height,
    frame: false,
    backgroundMaterial: 'acrylic',
    show: false,
    autoHideMenuBar: true,
    maximizable: false,
    minWidth: 720,
    titleBarStyle: 'hidden',
    icon:
      process.platform == 'linux'
        ? pngIcon
        : process.platform == 'darwin'
          ? icnsIcon
          : process.platform == 'win32'
            ? icoIcon
            : null,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      webSecurity: true,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.jpdoshi.tech')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    if (process.platform == 'win32') {
      details.requestHeaders['User-Agent'] =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    }

    if (process.platform == 'linux') {
      details.requestHeaders['User-Agent'] =
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    }

    if (process.platform == 'darwin') {
      details.requestHeaders['User-Agent'] =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    }
    callback({ cancel: false, requestHeaders: details.requestHeaders })
  })

  createWindow()

  if (userPreferences.get('settings').maximized == true) {
    mainWindow.maximize()
  }

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  mainWindow.on('resize', () => {
    const { width, height } = mainWindow.getBounds()
    userPreferences.set('windowBounds', { width, height })

    resizeTab()
  })

  mainWindow.on('maximize', () => {
    userPreferences.set('settings', { maximized: true })
  })

  mainWindow.on('unmaximize', () => {
    mainWindow.setSize(1200, 800)
    mainWindow.center()
    userPreferences.set('settings', { maximized: false })
  })

  registerShortcuts()
  createTab()
})

function createTab(url) {
  const tab = new WebContentsView()
  const windowBounds = mainWindow.getBounds()
  const index = tabs.length

  tab.webContents.loadURL(url || 'https://google.com')

  tab.setBackgroundColor('white')
  tab.setBorderRadius(8)
  tab.setBounds({
    x: isSidebarOpen == true ? 200 : 52,
    y: 40,
    width: isSidebarOpen == true ? windowBounds.width - 200 - 8 : windowBounds.width - 52 - 8,
    height: windowBounds.height - 40 - 8
  })

  tab.webContents.on('did-navigate', () => {
    const url = tab.webContents.getURL()
    const domain = new URL(url).hostname

    tabs[index].url = url
    tabs[index].domain = domain

    if (currentTab == index) {
      mainWindow.webContents.send('update-url', {
        url,
        canGoBack: tab.webContents.navigationHistory.canGoBack(),
        canGoForward: tab.webContents.navigationHistory.canGoForward()
      })
    }
    sendTabList()
  })

  tab.webContents.on('will-navigate', () => {
    mainWindow.webContents.send('set-isloading', { index, isLoading: true })
    sendTabList()
  })

  tab.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('set-isloading', { index, isLoading: false })
    sendTabList()
  })

  tab.webContents.on('page-favicon-updated', (event, favicons) => {
    if (tabs[index]) {
      const favicon = favicons.find((url) => url.includes('32')) || favicons[0]

      tabs[index].icon = favicon
      sendTabList()
    }
  })

  tab.webContents.on('page-title-updated', () => {
    const title = tab.webContents.getTitle()

    tabs[index].title = title
    sendTabList()
  })

  tab.webContents.on('did-create-window', (window, details) => {
    createTab(details.url)
    window.close()
  })

  tabs.push({ tab, icon: null, title: null, url: null, domain: null, isClosed: false, index })
  mainWindow.contentView.addChildView(tab)

  switchTab(tabs.length - 1)
  sendTabList()
}

function closeTab(index) {
  const tab = tabs[index].tab
  const firstOpenTab = tabs.find((item) => item.isClosed === false)

  mainWindow.contentView.removeChildView(tab)
  tabs[index].isClosed = true

  if (index == firstOpenTab.index && index == currentTab) {
    if (index == 0) {
      switchTab(1)
    } else {
      switchTab(index + 1)
    }
  } else if (index == currentTab) {
    switchTab(currentTab - 1)
  } else {
    switchTab(currentTab)
  }
  sendTabList()
}

function switchTab(index) {
  if (tabs.length > index) {
    currentTab = index

    for (let t of tabs) {
      t.tab.setVisible(false)
    }

    const url = tabs[index].tab.webContents.getURL()

    tabs[index].tab.setVisible(true)
    resizeTab()

    mainWindow.webContents.send('update-tab', { index })
    mainWindow.webContents.send('update-url', {
      url,
      canGoBack: tabs[index].tab.webContents.navigationHistory.canGoBack(),
      canGoForward: tabs[index].tab.webContents.navigationHistory.canGoForward()
    })
  }
}

function sendTabList() {
  let tabData = []

  for (let td of tabs) {
    const { icon, title, domain, isClosed, index } = td
    tabData.push({ icon, title, domain, isClosed, index })
  }

  mainWindow.webContents.send('tab-list', { tabData })
}

function reloadTab({ fromCache }) {
  const activeTab = tabs[currentTab].tab

  if (fromCache == true) {
    activeTab.webContents.reload()
  } else {
    activeTab.webContents.reloadIgnoringCache()
  }
  mainWindow.webContents.send('set-isloading', { index: currentTab, isLoading: true })
}

function resizeTab() {
  const { width, height } = mainWindow.getBounds()

  tabs[currentTab].tab.setBounds({
    x: isSidebarOpen == true ? 200 : 52,
    y: 40,
    width: isSidebarOpen == true ? width - 200 - 8 : width - 52 - 8,
    height: height - 40 - 8
  })
}

function registerShortcuts() {
  globalShortcut.register('CommandOrControl+Alt+S', () => {
    if (isSidebarOpen == true) {
      mainWindow.webContents.send('close-sidebar')
    } else {
      mainWindow.webContents.send('open-sidebar')
    }

    isSidebarOpen = !isSidebarOpen
    animateTab()
  })

  globalShortcut.register('CommandOrControl+R', () => {
    reloadTab({ fromCache: false })
  })

  globalShortcut.register('CommandOrControl+Shift+R', () => {
    reloadTab({ fromCache: false })
  })

  globalShortcut.register('F5', () => {
    reloadTab({ fromCache: true })
  })

  globalShortcut.register('CommandOrControl+T', () => {
    createTab()
  })

  globalShortcut.register('CommandOrControl+Shift+T', () => {
    console.log('open recently closed tab')
  })

  globalShortcut.register('CommandOrControl+W', () => {
    closeTab(currentTab)
  })

  globalShortcut.register('CommandOrControl+Tab', () => {
    currentTab++

    if (currentTab < tabs.length) {
      switchTab(currentTab)
    } else {
      switchTab(0)
    }
  })
}

function animateTab() {
  const { width, height } = mainWindow.getBounds()
  const targetX = isSidebarOpen ? 200 : 52
  const targetWidth = isSidebarOpen ? width - 200 - 8 : width - 52 - 8
  const targetY = 40
  const targetHeight = height - 40 - 8

  const tab = tabs[currentTab].tab
  const currentBounds = tab.getBounds()

  const duration = 250
  const startTime = Date.now()

  function animate() {
    const now = Date.now()
    const elapsedTime = now - startTime
    const progress = Math.min(elapsedTime / duration, 1)

    const newX = currentBounds.x + (targetX - currentBounds.x) * progress
    const newY = currentBounds.y + (targetY - currentBounds.y) * progress
    const newWidth = currentBounds.width + (targetWidth - currentBounds.width) * progress
    const newHeight = currentBounds.height + (targetHeight - currentBounds.height) * progress

    tab.setBounds({
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight
    })

    if (progress < 1) {
      setImmediate(animate) // Use setImmediate to simulate smooth animation
    }
  }

  animate()
}

ipcMain.handle('is-maximized', () => {
  return mainWindow.isMaximized()
})

ipcMain.handle('toggle-maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }

  return mainWindow.isMaximized()
})

ipcMain.handle('close-window', () => {
  mainWindow.close()
})

ipcMain.handle('minimize', () => {
  mainWindow.minimize()
})

ipcMain.handle('open-sidebar', () => {
  isSidebarOpen = true
  animateTab()
})

ipcMain.handle('close-sidebar', () => {
  isSidebarOpen = false
  animateTab()
})

ipcMain.handle('go-back', () => {
  const activeTab = tabs[currentTab].tab

  if (activeTab.webContents.navigationHistory.canGoBack()) {
    activeTab.webContents.navigationHistory.goBack()
  }
})

ipcMain.handle('go-forward', () => {
  const activeTab = tabs[currentTab].tab

  if (activeTab.webContents.navigationHistory.canGoForward()) {
    activeTab.webContents.navigationHistory.goForward()
  }
})

ipcMain.handle('reload', () => {
  const activeTab = tabs[currentTab].tab

  if (activeTab) {
    activeTab.webContents.reload()
  }
})

ipcMain.handle('load-url', (event, data) => {
  const activeTab = tabs[currentTab].tab
  const url = data

  if (activeTab) {
    activeTab.webContents.loadURL(url)
    mainWindow.webContents.send('set-isloading', {
      index: currentTab,
      isLoading: true
    })
  }
})

ipcMain.handle('update-current-tab', (event, data) => {
  const { index } = data
  switchTab(index)
})

ipcMain.handle('create-tab', () => {
  createTab()
})

ipcMain.handle('close-tab', (event, data) => {
  const { index } = data
  closeTab(index)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('browser-window-blur', () => {
  globalShortcut.unregisterAll()
})

app.on('browser-window-focus', () => {
  registerShortcuts()
})
