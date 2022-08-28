// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path');
const fs = require('fs');
const drivelist = require('drivelist');
// try {
//   require('electron-reloader')(module);
// } catch { }

let mainWindow;
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

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('load-appstate', () => {
    return JSON.parse(fs.readFileSync("./app/state.json"));
  });
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/** APIs **/
// Use ipc to receive text to save to a file using system save dialog
ipcMain.on('save-code', (event, req) => {
  const appState = JSON.parse(fs.readFileSync("./app/state.json"));
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
    title: 'Save Code',
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
  fs.writeFileSync("./app/state.json", JSON.stringify(appState));
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


  // const filePath = dialog.showSaveDialogSync({
  //   title: 'Save Code',
  //   defaultPath: 'code.py',
  //   filters: [{ name: 'Python', extensions: ['py'] }]
  // });
  // if (filePath) {
  //   fs.writeFileSync(filePath, code);
  // }
  // responseObj = "Saved Code";
  // mainWindow.webContents.send("fromMain", responseObj);
});

// Open File
ipcMain.on('open-file', (event, code) => {
  const filePath = dialog.showOpenDialogSync({
    properties: ['openFile'],
    // title: 'Open File',
    filters: [{ name: 'First+', extensions: ['fp'] }]
  });
 
  if (filePath) {
    let inputFile = fs.readFileSync(filePath[0]);
    console.log(inputFile);
  }
  // responseObj = "Saved Code";
  // mainWindow.webContents.send("fromMain", responseObj);
});