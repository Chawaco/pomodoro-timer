import path from 'path';
import { BrowserWindow, app, session } from 'electron';
import { searchDevtools } from 'electron-search-devtools';

const isDev = process.env.NODE_ENV === 'development';

// Auto-reloading only in development mode.
if (isDev) {
  const execPath =
    process.platform === 'win32'
      ? '../node_modules/electron/dist/electron.exe'
      : '../node_modules/.bin/electron';

  require('electron-reload')(__dirname, {
    electron: path.resolve(__dirname, execPath),
    forceHardReset: true,
    hardResetMethod: 'exit',
  });
}

// Create the BrowserWindow.
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    // Open devtools only in development mode.
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // Load renderer process.
  mainWindow.loadFile('dist/index.html');
};

// Prevents Chromium from lowering the priority of invisible pages' renderer processes.
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.whenReady().then(async () => {
  if (isDev) {
    // Load devtools only in development mode.
    const devtools = await searchDevtools('REACT');
    if (devtools) {
      await session.defaultSession.loadExtension(devtools, {
        allowFileAccess: true,
      });
    }
  }

  createWindow();
});

// When all windows are closed, the application will terminate.
app.once('window-all-closed', () => app.quit());

// Change App User Model ID to change the display of notifications.
if (process.platform === 'win32') {
  app.setAppUserModelId(app.name);
}