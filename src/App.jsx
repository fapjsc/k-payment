import React, { useEffect, useState, Suspense } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Router
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoute from './routes/PublicRoutes';
import PrivateRoute from './routes/PrivateRoutes';

// Screens
import LandingScreen from './screen/LandingScreen';
import NotFound from './screen/404';
import LoadingScreen from './screen/LoadingScreen';

// Layout
import HeaderLayout from './layout/header/HeaderLayout';
import ContentLayout from './layout/ContentLayout';

// Hooks
import useRwd from './hooks/useRwd';

// Styles
import './App.scss';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { orderInfo } = useSelector((state) => state.openOrder);

  const { fullScreen } = useSelector((state) => state.chatFullScreen);

  // Hooks
  const { isMobile } = useRwd();

  useEffect(() => {
    if (!orderInfo) return;
    setIsAuthenticated(true);
  }, [orderInfo]);

  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        {(!fullScreen || !isMobile) && <HeaderLayout />}
        <ContentLayout>
          <Switch>
            <Route path="/not-found" exact>
              <NotFound />
            </Route>

            <PrivateRoute path="/auth" isAuthenticated={isAuthenticated}>
              <ProtectedRoutes />
            </PrivateRoute>

            <PublicRoute path="/:id" isAuthenticated={isAuthenticated}>
              <LandingScreen />
            </PublicRoute>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </ContentLayout>
      </Suspense>
    </Router>
  );
};

export default App;
