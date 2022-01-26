import React from 'react';

import {
  Route,
  //eslint-disable-next-line
  Redirect,
} from 'react-router-dom';

// eslint-disable-next-line
const PublicRoute = ({ children, isAuthenticated, ...rest }) => {
  console.log('pub');
  return (
    <Route
      // eslint-disable-next-line
      {...rest}
      render={
        // eslint-disable-next-line
        ({ location }) => !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth/home',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
