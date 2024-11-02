import pkg from 'electron';
const { app, BrowserWindow } = pkg;
import path from 'path';

function createWindow() {
    const win = new BrowserWindow({
        width: 1800,
        height: 1600,
        enablePreferredSizeMode: true,
        transparent: true, // Key for transparency
        frame: false, // Remove default window frame with false
        //resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            //preload: path.join(__dirname, 'preload.js'),
        }
    });

    //win.loadFile('public/index.html');
    win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
