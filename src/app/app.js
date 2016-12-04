import React, { Component } from 'react';


export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="container">
      <h1 className="title">Ajax Projects</h1>
      <div className="wrapper">
        <ul className="linked-list">
          <li><a className="link" href="local-weather">Local Weather</a></li>
          <li><a className="link" href="random-quote-machine">Random Quote Machine</a></li>
          <li><a className="link" href="wikipedia-viewer">Wikipedia Viewer</a></li>
        </ul>
      </div>
    </div>
  }
}
