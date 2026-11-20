const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktop', {
  saveFile: (filename, bytes) => ipcRenderer.invoke('save-file', { filename, bytes })
});
