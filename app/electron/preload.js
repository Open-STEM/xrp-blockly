const {
  contextBridge,
  ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
    saveCode: (req) => ipcRenderer.invoke('save-code', req),
    saveAsCode: (req) => ipcRenderer.invoke('saveas-code', req),
    openFile: () => ipcRenderer.invoke('open-file'),
    uploadCode: (code) => ipcRenderer.invoke('upload-code', code),
    loadAppState: () => ipcRenderer.invoke('load-appstate'),
    robotConnected: (callback) => ipcRenderer.on('bot-connected', callback),
    robotCOMStream: (callback) => ipcRenderer.on('bot-com-port', callback)
  }
);