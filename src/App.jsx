import React from 'react';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import LandingScreen from './screen/LandingScreen';
import NotFound from './screen/404';
import Payment from './screen/Payment';

import ChatWidget from './components/ChatWidget';
// Styles
import './App.scss';
import 'react-chat-widget/lib/styles.css';

const App = () => (
  <Router>
    <main>
      <Switch>
        <Route path="/not-found" component={NotFound} />
        <Route path="/payment/:id" component={Payment} />
        <Route path="/:id" component={LandingScreen} />
        <Route exact path="/" component={NotFound} />
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
    <ChatWidget />
  </Router>
);

export default App;
