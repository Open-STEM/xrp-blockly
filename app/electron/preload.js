const {
  contextBridge,
  ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ["save-code", "saveas-code", "open-file", "upload-code"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["fromMain","opened-file"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender` 
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  loadAppState: () => ipcRenderer.invoke('load-appstate'),
  robotConnected: (callback) => ipcRenderer.on('bot-connected', callback),
  openedFile: (callback) => ipcRenderer.on('opened-file', callback)
}
);