/*
 * @Author: MADAO
 * @Date: 2021-03-04 14:13:12
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-04 16:34:29
 * @Description: 入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => (
  <h1>
    My React and TypeScript App!
  </h1>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
