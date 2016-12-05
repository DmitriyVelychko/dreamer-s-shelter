import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './app/app'
import LocalWeather from './app/local.weather'
import RandomQuoteMachine from './app/random.quote.machine'
import WikipediaViewer from './app/wikipedia.viewer'

export default(
  <Router history={browserHistory}>
    <Route path='/' component={App}/>
    <Route path='local-weather' component={LocalWeather}/>
    <Route path='random-quote-machine' component={RandomQuoteMachine}/>
    <Route path='wikipedia-viewer' component={WikipediaViewer}/>
  </Router>
);
