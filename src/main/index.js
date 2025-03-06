import { app, shell, BrowserWindow, ipcMain } from 'electron'
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

function createWindow() {
  mainWindow = new BrowserWindow({
    width: userPreferences.get('windowBounds').width,
    height: userPreferences.get('windowBounds').height,
    frame: false,
    backgroundMaterial: 'acrylic',
    show: false,
    autoHideMenuBar: true,
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
  })

  mainWindow.on('maximize', () => {
    userPreferences.set('settings', { maximized: true })
  })

  mainWindow.on('unmaximize', () => {
    mainWindow.setSize(1200, 800)
    mainWindow.center()
    userPreferences.set('settings', { maximized: false })
  })
})

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

ipcMain.handle('quit-app', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('minimize', () => {
  mainWindow.minimize()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
