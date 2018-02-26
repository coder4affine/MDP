import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from './components/loadingComponent';
import PrivateRoute from './components/privateRoute';

const AsyncDigitalCard = Loadable({
  loader: () => import('./containers/digitalCardPage'),
  loading: Loading,
});

const AsyncLogin = Loadable({
  loader: () => import('./containers/Login'),
  loading: Loading,
});

const AsyncRegisterOne = Loadable({
  loader: () => import('./containers/RegisterOne'),
  loading: Loading,
});
const AsyncRegisterTwo = Loadable({
  loader: () => import('./containers/RegisterTwo'),
  loading: Loading,
});

const AsyncNotFound = Loadable({
  loader: () => import('./containers/notFoundPage'),
  loading: Loading,
});

const Routes = ({ isAuthenticated }) => (
  <Switch>
    <Route exact path="/" component={AsyncLogin} />
    <Route path="/registerOne" component={AsyncRegisterOne} />
    <Route path="/registerTwo" component={AsyncRegisterTwo} />
    <PrivateRoute path="/about" component={AsyncDigitalCard} isAuthenticated={isAuthenticated} />
    <Route component={AsyncNotFound} />
  </Switch>
);

Routes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Routes;
