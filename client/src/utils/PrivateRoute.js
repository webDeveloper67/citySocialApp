import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) =>
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? <Redirect to="/signin" /> : <Component {...props} />}
  />;

const mapState = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapState)(PrivateRoute);
