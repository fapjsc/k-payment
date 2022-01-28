import React from 'react';

import {
  Route,
  Redirect,
} from 'react-router-dom';

// Hooks
import useQuery from '../hooks/useQuery';

// eslint-disable-next-line
  const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  const query = useQuery();
  const id = query.get('id');
  const session = query.get('session');
  return (
    <Route
  // eslint-disable-next-line
        {...rest}
      render={
          ({ location }) => (
            isAuthenticated || id || session
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
