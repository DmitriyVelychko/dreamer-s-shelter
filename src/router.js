import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './app/app'
import LocalWeather from './app/local.weather'

export default(
  <Router history={browserHistory}>
    <Route path='/' component={App}/>
    <Route path='local-weather' component={LocalWeather}/>
  </Router>
);
