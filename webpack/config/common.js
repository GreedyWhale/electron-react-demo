/*
 * @Author: MADAO
 * @Date: 2021-03-04 11:20:09
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-05 17:22:49
 * @Description: webpack 通用配置
 */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // eslint-disable-next-line global-require
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash].[ext]',
        },
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
};
