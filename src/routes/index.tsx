import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import SignIn from '../pages/Signin';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
// import ResetPassword from '../pages/ResetPassword';
import ProductEdit from '../pages/ProductEdit';
import Order from '../pages/Orders';
import OrderEdit from '../pages/OrderEdit';
import OrderClosed from '../pages/OrdersClosed';
import Users from '../pages/Users';
import TimeFrame from '../pages/TimeFrame';
import { TimeFramesProvider } from '../hooks/useTimeFrames';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    {/* <Route path="/reset-password" component={ResetPassword} /> */}

    <Route path="/home" component={Home} isPrivate />
    <Route path="/product" component={ProductEdit} isPrivate />
    <Route path="/orders" component={Order} isPrivate />
    <Route path="/orderedit" component={OrderEdit} isPrivate />
    <Route path="/ordersclosed" component={OrderClosed} isPrivate />
    <Route path="/users" component={Users} isPrivate />
    <TimeFramesProvider>
      <Route path="/timeframe" component={TimeFrame} isPrivate />
    </TimeFramesProvider>
  </Switch>
);

export default Routes;
