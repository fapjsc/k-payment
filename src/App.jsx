import React from 'react';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Screens
import LandingScreen from './screen/LandingScreen';
import NotFound from './screen/404';
import HomeScreen from './screen/HomeScreen';
// import BuyScreen from './screen/BuyScreen';

// Styles
import './App.scss';

const App = () => (
  <Router>
    <Switch>
      <Route path="/not-found" component={NotFound} />
      <Route path="/home/:id" component={HomeScreen} />
      {/* <Route path="/buy/:id" component={BuyScreen} /> */}
      <Route path="/:id" component={LandingScreen} />
      <Route exact path="/" component={NotFound} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default App;
