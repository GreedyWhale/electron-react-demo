/*
 * @Author: MADAO
 * @Date: 2021-03-03 15:33:41
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-05 16:39:33
 * @Description: 主进程打包文件
 */
const { join } = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  target: 'electron-main',
  entry: {
    main: join(__dirname, '../../src/main/index.ts'),
  },
  output: {
    filename: 'main.js',
    path: join(__dirname, '../../dist'),
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['main.js'],
    }),
  ],
  node: {
    __dirname: false,
  },
});
