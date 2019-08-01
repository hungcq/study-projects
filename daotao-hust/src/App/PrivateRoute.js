import React from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';
// import * as fromReducers from '../_reducers';
import { connect } from 'react-redux';

const PrivateRoute = ({ to, component: Component, ...rest }) => {
  return (
    <Route path={to} {...rest} render={props => (
      hasSetting ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
            pathname: '/setting-init',
            state: {
              from: props.location
            }
          }}
          />
        )
    )}
    />
  );
};

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);