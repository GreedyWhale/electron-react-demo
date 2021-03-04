/*
 * @Author: MADAO
 * @Date: 2021-03-04 11:20:09
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-04 15:37:52
 * @Description: webpack 通用配置
 */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { join } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: true,
      eslint: {
        files: join(__dirname, '../../src'),
      },
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['main.js'],
    }),
  ],
};
