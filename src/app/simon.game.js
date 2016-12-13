import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SimonGame extends Component {
  constructor() {
    super();
  }


  render() {
    return <div>
      <Link to="/" className="link link-home">Home</Link>
      <div className="title">Simon Game</div>
      <div className="simon">
        <div className="left">
          <div className="led red"></div>
          <div className="led yellow"></div>
        </div>
        <div className="right">
          <div className="led green"></div>
          <div className="led blue"></div>
        </div>
      </div>
    </div>
  }
}
