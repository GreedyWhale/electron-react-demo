/*
 * @Author: MADAO
 * @Date: 2021-04-10 14:36:53
 * @LastEditors: MADAO
 * @LastEditTime: 2021-04-10 17:55:31
 * @Description: 自动重启 && 刷新electron
 */

import chokidar from 'chokidar';
import { join } from 'path';
import { spawn } from 'child_process';
import { app, BrowserWindow } from 'electron';

let relaunchLock = false;
let reloadLock = false;
// eslint-disable-next-line no-undef
let relaunchTimer: NodeJS.Timer;
// eslint-disable-next-line no-undef
let reloadTimer: NodeJS.Timer;
const rootPath = process.cwd();

const appRelaunch = (path:string) => {
  if (relaunchLock) { return; }
  relaunchLock = true;
  clearTimeout(relaunchTimer);
  relaunchTimer = setTimeout(() => {
    console.log(`Relaunching for ${path} changed.`);
    const child = spawn('yarn start:electron', {
      detached: true, // 使子进程在父进程退出后继续运行
      stdio: 'inherit',
      shell: true,
    });
    // 使父子进程独立
    child.unref();
    app.exit();
  }, 300);
};

const windowReload = (path: string) => {
  if (reloadLock) { return; }
  reloadLock = true;
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    console.log(`Reloaded for ${path} changed.`);
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((item) => {
      const context = item.webContents;
      if (context.isDevToolsOpened()) {
        context.closeDevTools();
        context.reloadIgnoringCache();
        context.on('did-frame-finish-load', () => {
          context.once('devtools-opened', () => {
            item.focus();
          });
          context.openDevTools();
        });
      } else {
        context.reloadIgnoringCache();
      }
    });
  }, 300);
};

const watcher = () => {
  chokidar.watch(join(rootPath, '/dist'), {
    ignored: /node_modules/,
    alwaysStat: true,
  }).on('change', (path, stats) => {
    if (stats) {
      if (path.search(new RegExp('main\\.js')) !== -1) {
        appRelaunch(path);
        return;
      }
      windowReload(path);
    }
  });
};

export default watcher;
