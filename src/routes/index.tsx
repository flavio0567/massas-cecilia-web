import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import SignIn from '../pages/Signin';
import SignUp from '../pages/SignUp';
import Product from '../pages/Product';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/home" component={Home} isPrivate />
    <Route path="/product" component={Product} isPrivate />
  </Switch>
);

export default Routes;
