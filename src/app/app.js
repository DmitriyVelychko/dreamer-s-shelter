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
          <li><Link className="link" to="local-weather">Local Weather</Link></li>
          <li><a className="link" href="random-quote-machine">Random Quote Machine</a></li>
          <li><a className="link" href="wikipedia-viewer">Wikipedia Viewer</a></li>
        </ul>
      </div>
    </div>
  }
}
