// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path');
const fs = require('fs');
const drivelist = require('drivelist');
var AsyncPolling = require('async-polling');

var mainWindow;
createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    sandbox: false,
    contextIsolation: true,
    show: false,
    nodeIntegration: true
  })

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.setMenu(null);

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('load-appstate', () => {
    return {
      appstate: JSON.parse(fs.readFileSync("./app/state.json")),
      package: JSON.parse(fs.readFileSync("./package.json"))
    }
  });
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  AsyncPolling(function (end) {
    drivelist.list()
      .then(drives => {
        let first_bot = drives.find(x => x.description.includes('Maker Pi RP2040'));
        if (first_bot) mainWindow.webContents.send('bot-connected', true);
        else mainWindow.webContents.send('bot-connected', false);
        end()
      })
      .catch(err => {
        end();
      });
  }, 3000).run();
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function getMainWindow() {
  return mainWindow
};

global.share = {
  mainWindow,
  ipcMain,
  getMainWindow
};

require('./apis.js');