/*
 * @Author: MADAO
 * @Date: 2021-03-05 16:05:25
 * @LastEditors: MADAO
 * @LastEditTime: 2021-03-05 17:05:16
 * @Description: 页面路由配置
 */

import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Home from '@/renderer/pages/Home';

const Router = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  </HashRouter>
);

export default Router;
