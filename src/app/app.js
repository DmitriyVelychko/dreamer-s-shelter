import React, { Component } from 'react';
import { Link } from 'react-router';


export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <h1 className="title">Ajax Projects</h1>
      <div className="wrapper">
        <ul className="linked-list">
          <li><Link className="link" to="/local-weather">Local Weather</Link></li>
          <li><Link className="link" to="/random-quote-machine">Random Quote Machine</Link></li>
          <li><Link className="link" to="/wikipedia-viewer">Wikipedia Viewer</Link></li>
        </ul>
      </div>
    </div>
  }
}
