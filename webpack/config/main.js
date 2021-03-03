/*
 * @Author: MADAO
 * @Date: 2021-03-03 15:33:41
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-03 16:49:44
 * @Description: 主进程打包文件
 */
const { join } = require('path')
const ReloadElectron = require('../plugins/reloadElectron')

module.exports = {
  mode: 'production',
  target: 'electron-main',
  entry: join(__dirname, '../../src/main/index.ts'),
  output: {
    filename: 'main.js',
    path: join(__dirname, '../../dist')
  },
  plugins: [
    new ReloadElectron()
  ]
}