// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, protocol } = require('electron')
const path = require('path');
const fs = require('fs');
const drivelist = require('drivelist');
var AsyncPolling = require('async-polling');

let mainWindow;
function createWindow () {
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

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";
  mainWindow.loadURL(appURL);
  mainWindow.setMenu(null);

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('load-appstate', () => {
    return JSON.parse(fs.readFileSync("./state.json"));
  });
  createWindow()
  setupLocalFilesNormalizerProxy();

  app.on('activate', function () {
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
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


/** APIs **/
// Use ipc to receive text to save to a file using system save dialog
ipcMain.on('save-code', (event, req) => {
  const appState = JSON.parse(fs.readFileSync("./state.json"));
  if (appState.fullPath != "") {
    let filePath = path.join(appState.fullPath, req.filename);
    fs.writeFileSync(filePath, req.content);
  } else {
    handleSaveAs(req, appState)
  }
  responseObj = "Saved Code";
  mainWindow.webContents.send("fromMain", responseObj);
});

function handleSaveAs(req, appState) {
  const filePath = dialog.showSaveDialogSync({
    title: 'Save As',
    defaultPath: req.filename,
    filters: [{ name: 'First+', extensions: ['fp'] }]
  });
  if (filePath) {
    updateStateJson(appState, { fullPath: path.dirname(filePath) });
    fs.writeFileSync(filePath, req.content);
  }
}

function updateStateJson(appState, slice) {
  for (const [key, value] of Object.entries(slice)) {
    appState[key] = value;
  }
  fs.writeFileSync("./state.json", JSON.stringify(appState));
  // TODO: update state in frontend?
}

// Upload Code
ipcMain.on('upload-code', (event, code) => {
  drivelist.list()
    .then(drives => {
      let first_bot = drives.find(x => x.description.includes('Maker Pi RP2040'));
      let first_bot_drive = first_bot.mountpoints[0].path;
      let output_filepath = path.join(first_bot_drive, 'code.py');
      fs.writeFileSync(output_filepath, code);
    });
});

// Open File
ipcMain.on('open-file', (event, code) => {
  const filePath = dialog.showOpenDialogSync({
    title: "Open File",
    properties: ['openFile'],
    // title: 'Open File',
    filters: [{ name: 'First+', extensions: ['fp'] }]
  });

  if (filePath) {
    let inputFile = fs.readFileSync(filePath[0], { encoding: 'utf8' });
    mainWindow.webContents.send("opened-file", inputFile);
  }
});