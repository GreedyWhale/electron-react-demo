/*
 * @Author: MADAO
 * @Date: 2021-03-04 14:13:12
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-05 16:15:35
 * @Description: 入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';

const App: React.FC = () => (
  <div>
    <Router />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
