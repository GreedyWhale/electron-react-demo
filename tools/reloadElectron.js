/*
 * @Author: MADAO
 * @Date: 2021-03-04 17:33:01
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-05 10:29:28
 * @Description:  重启electron当主进程文件发生变化
 */

const chokidar = require('chokidar');
const { join } = require('path');
const { spawn } = require('child_process');
const kill = require('tree-kill');
const logSymbols = require('log-symbols');
const waitOn = require('wait-on');

let electronProcess = null;

const reloadElectron = () => {
  electronProcess = spawn('yarn start:electron', { shell: true });
  electronProcess.stderr.on('data', (error) => {
    console.error(logSymbols.error, 'yarn start:electron');
    console.error(logSymbols.error, error);
  });
};

waitOn({ resources: [`http://localhost:${process.env.NODE_PORT}`] }).then(() => {
  reloadElectron();
}, (error) => console.error(logSymbols.error, error));

const watcher = chokidar.watch([
  join(__dirname, '../dist/main.js'),
  join(__dirname, '../src/main'),
]);

watcher.on('change', (path) => {
  console.log(logSymbols.info, `[主进程]：${path}文件发生变化`);
  if (electronProcess !== null) {
    kill(electronProcess.pid, 'SIGKILL');
    electronProcess = null;
  }
  // 主进程源码变化
  if (/src/.test(path)) {
    electronProcess = spawn('yarn build:main', { shell: true });
    electronProcess.stderr.on('data', (error) => {
      console.error(logSymbols.error, 'yarn build:main');
      console.error(logSymbols.error, error);
    });
    return;
  }
  reloadElectron();
});
