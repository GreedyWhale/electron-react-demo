/*
 * @Author: MADAO
 * @Date: 2021-03-03 15:40:28
 * @LastEditors: MADAO
 * @Description: 主进程入口
 */
import {
  app, BrowserWindow,
} from 'electron';
import url from 'url';
import { join } from 'path';
import { isDevelopment } from '@/utils/index';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const pagePath = isDevelopment
    ? `http://localhost:${process.env.NODE_PORT}`
    : url.pathToFileURL(new URL(join(__dirname, './index.html')).href).href;
  win.loadURL(pagePath);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
