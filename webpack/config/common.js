/*
 * @Author: MADAO
 * @Date: 2021-03-04 11:20:09
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-05 14:39:47
 * @Description: webpack 通用配置
 */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { join } = require('path');

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
    alias: {
      '@': join(__dirname, '../../src'),
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: true,
      eslint: {
        files: join(__dirname, '../../src'),
      },
    }),
  ],
};
