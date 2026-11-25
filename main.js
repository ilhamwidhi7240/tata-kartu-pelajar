const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 860, minWidth: 420,
    title: 'Tata Kartu Pelajar',
    autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false }
  });
  Menu.setApplicationMenu(null);
  win.loadFile('index.html');
}

ipcMain.handle('save-file', async (event, { filename, bytes }) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  const ext = path.extname(filename).slice(1).toLowerCase() || 'pdf';
  const names = { pdf: 'PDF', xlsx: 'Excel' };
  const result = await dialog.showSaveDialog(win, {
    defaultPath: filename,
    filters: [{ name: names[ext] || ext.toUpperCase(), extensions: [ext] }]
  });
  if (result.canceled || !result.filePath) return { canceled: true };
  await fs.promises.writeFile(result.filePath, Buffer.from(bytes));
  return { canceled: false, path: result.filePath };
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
