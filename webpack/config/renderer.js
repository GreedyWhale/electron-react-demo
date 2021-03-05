/*
 * @Author: MADAO
 * @Date: 2021-03-04 14:29:04
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-05 10:34:24
 * @Description: 渲染进程webpack配置
 */

const { merge } = require('webpack-merge');
const { join } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  target: 'electron-renderer',
  entry: {
    index: join(__dirname, '../../src/renderer/index.tsx'),
  },
  output: {
    filename: 'js/[name].js',
    path: join(__dirname, '../../dist/'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'i18n_accelerator_pc',
      filename: 'index.html',
      template: join(__dirname, '../../src/renderer/template/index.html'),
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!main.js'],
    }),
  ],
  devServer: {
    contentBase: join(__dirname, '../../dist'),
    compress: true,
    port: process.env.NODE_PORT,
  },
});
