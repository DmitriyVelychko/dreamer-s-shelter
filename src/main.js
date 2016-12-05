import React from 'react';
import ReactDOM from 'react-dom';

import router from './router';

ReactDOM.render(
  <div className="container">{router}</div>,
  document.getElementById('root')
);
