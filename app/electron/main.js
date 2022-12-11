// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const drivelist = require('drivelist');
const { SerialPort } = require('serialport');
var AsyncPolling = require('async-polling');

if (require('electron-squirrel-startup')) return app.quit();

var mainWindow;
createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // width: 960,
    // height: 540,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    sandbox: false,
    contextIsolation: true,
    show: false,
    nodeIntegration: true,
    icon: path.join(__dirname, '../xrp_icon.png')
  })

  mainWindow.maximize();

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

var currentlyConnectedPorts = [];
var currentlyConnectedPortObjects = {};
var stoppingPorts = false;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('load-appstate', () => {
    return {
      appstate: JSON.parse(fs.readFileSync(path.join(__dirname, "../state.json"))),
      package: JSON.parse(fs.readFileSync(path.join(__dirname, "../../package.json")))
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

  // Check for port changes every 3 seconds
  AsyncPolling(function (end) { 
    if (!stoppingPorts) {
      SerialPort.list()
      .then(availablePorts => {
        // See if any ports are connected
        if (availablePorts.length > 0) {
          const currentPortPath = availablePorts[0]['path'];
          if (!currentlyConnectedPorts.includes(currentPortPath)) {
            // Open a port if it is not already connected
            const serialport = new SerialPort({ path: currentPortPath, baudRate: 9600 });
            currentlyConnectedPorts.push(currentPortPath);
            currentlyConnectedPortObjects[currentPortPath] = serialport;
            // Switches the port into "flowing mode"
            serialport.on('readable', function () {
              if (!stoppingPorts) {
                mainWindow.webContents.send('bot-com-port', {
                  'port': currentPortPath,
                  'data': serialport.read().toString()
                });
              }
            })
            serialport.on('close', () => {
              currentlyConnectedPorts = currentlyConnectedPorts.filter(x => x !== currentPortPath);
              delete currentlyConnectedPortObjects[currentPortPath];
              // currentlyConnectedPortObjects = currentlyConnectedPortObjects.filter(x => x !== serialport);
            })
          }
        } else {
          console.log("No devices plugged in");
        }
        end();
      })
      .catch(err => {
        end();
      });
    }
  }, 3000).run();
})

/*
  Check every 3 seconds if 
  When a new path exists, make a new port from the path and trigger the callback.
  If no path exists, 
*/

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('will-quit',function(){
  stoppingPorts = true;
  for (const [portname, portobj] of Object.entries(currentlyConnectedPortObjects)) {
    portobj.close();
    delete currentlyConnectedPortObjects[portname];
  }
});
  
app.on('quit',function(){
  stoppingPorts = true;
  for (const [portname, portobj] of Object.entries(currentlyConnectedPortObjects)) {
    portobj.close();
    delete currentlyConnectedPortObjects[portname];
  }
});

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