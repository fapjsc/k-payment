import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes'; // Route list
// import Loader from 'sharedComponent/Loader';

const ProtectedRoutes = () => (
  <Switch>
    <Suspense
      fallback={<h1>Loading...</h1>}
    >
      {routes.map(({ component: Component, path, exact }) => (
        <Route
          path={`/auth/${path}`}
          key={path}
          exact={exact}
        >
          <Component />
        </Route>
      ))}
    </Suspense>
  </Switch>
);

export default ProtectedRoutes;
