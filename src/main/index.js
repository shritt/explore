import { app, shell, BrowserWindow, ipcMain, WebContentsView } from 'electron'
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

  // ----------------------------------------------
  createTab()
  // ----------------------------------------------
})

function createTab() {
  const tab = new WebContentsView()
  const windowBounds = mainWindow.getBounds()

  tab.webContents.loadURL('https://duckduckgo.com')

  tab.setBackgroundColor('white')
  tab.setBorderRadius(8)
  tab.setBounds({
    x: isSidebarOpen == true ? 200 : 52,
    y: 48,
    width: isSidebarOpen == true ? windowBounds.width - 200 - 8 : windowBounds.width - 52 - 8,
    height: windowBounds.height - 48 - 8
  })

  tabs.push({ index: tabs.length + 1, tab, isClosed: false })
  mainWindow.contentView.addChildView(tab)
}

function closeTab(tabIndex) {
  // make tab sleep mode with tab being closed by index
  //
  // remove tab from frontend, while preserving original tab to open it after
  // being closed
  //
  // make it quiet so it doesn't work in background
  //
  // should not show when switching tabs
}

function switchTab(tabIndex) {
  // switch to tab index
  //
  // set tab bounds relative to window bounds
  //
  // should not switch to sleeping(closed) tabs
}

function goBack(tabIndex) {
  // go back in current tab
}

function goForward(tabIndex) {
  // go forward in current tab
}

function loadUrl(tabIndex, url) {
  // load url in current tab
}

function reload(tabIndex) {
  // reload current tab
}

function resizeTab() {
  const { width, height } = mainWindow.getBounds()

  tabs[currentTab].tab.setBounds({
    x: isSidebarOpen == true ? 200 : 52,
    y: 48,
    width: isSidebarOpen == true ? width - 200 - 8 : width - 52 - 8,
    height: height - 48 - 8
  })
}

function animateSidebar() {
  const { width, height } = mainWindow.getBounds()
  const targetX = isSidebarOpen ? 200 : 52
  const targetWidth = isSidebarOpen ? width - 200 - 8 : width - 52 - 8
  const targetY = 48
  const targetHeight = height - 48 - 8

  const tab = tabs[currentTab].tab
  const currentBounds = tab.getBounds()

  const duration = 200
  const startTime = Date.now()

  function animate() {
    const now = Date.now()
    const progress = Math.min((now - startTime) / duration, 1)

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
      setTimeout(animate, 16) // ~60 FPS (1000ms / 60 ≈ 16ms per frame)
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

ipcMain.handle('toggle-sidebar', () => {
  isSidebarOpen = !isSidebarOpen
  animateSidebar()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
