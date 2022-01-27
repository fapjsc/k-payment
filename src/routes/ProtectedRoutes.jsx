import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes'; // Route list
// import Loader from 'sharedComponent/Loader';

// Screen
import LoadingScreen from '../screen/LoadingScreen';

const ProtectedRoutes = () => (
  <Switch>
    <Suspense fallback={<LoadingScreen />}>
      {routes.map(({ component: Component, path, exact }) => (
        <Route path={`/auth/${path}`} key={path} exact={exact}>
          <Component />
        </Route>
      ))}
    </Suspense>
  </Switch>
);

export default ProtectedRoutes;
