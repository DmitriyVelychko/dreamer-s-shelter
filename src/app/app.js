import React, { Component } from 'react';
import { Link } from 'react-router';


export default class App extends Component {
  render() {
    return <div>
      <h1 className="title">Projects</h1>
      <div className="wrapper">
        <h2 className="title">Ajax</h2>
        <ul className="linked-list">
          <li><Link className="link" to="/local-weather">Local Weather</Link></li>
          <li><Link className="link" to="/random-quote-machine">Random Quote Machine</Link></li>
          <li><Link className="link" to="/wikipedia-viewer">Wikipedia Viewer</Link></li>
        </ul>
        <h2 className="title">Advanced</h2>
        <ul className="linked-list">
          <li><Link className="link" to="/simon-game">Simon Game</Link></li>
        </ul>
      </div>
    </div>
  }
}
