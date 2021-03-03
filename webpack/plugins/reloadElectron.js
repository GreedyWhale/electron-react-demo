/*
 * @Author: MADAO
 * @Date: 2021-03-03 16:36:10
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-03 17:45:26
 * @Description: 重启electron当主进程文件发生变化
 */
const colors = require('colors')
const { spawn } = require('child_process')
const kill = require('tree-kill');

let electronProcess = null

function ReloadElectron () {}

ReloadElectron.prototype.apply = (compiler) => {
  compiler.hooks.done.tap('ReloadElectron', () => {
    console.log('编译完成'.green)
    if (electronProcess !== null) {
      kill(electronProcess.pid, 'SIGKILL')
      electronProcess = null
     }
    electronProcess = spawn('yarn start:electron', { shell: true })
    electronProcess.stderr.on('data', (error) => {
      console.error(`stderr: ${error}`.red);
    })
  })
}

module.exports = ReloadElectron
