import React from 'react';

import {
  Route,
  Redirect,
} from 'react-router-dom';

// eslint-disable-next-line
  const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  console.log('private', isAuthenticated);
  return (
    <Route
  // eslint-disable-next-line
        {...rest}
      render={
          ({ location }) => (
            isAuthenticated
              ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: '/',
                    state: { from: location },
                  }}
                />
              ))
        }
    />
  );
};

export default PrivateRoute;
