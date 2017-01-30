import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SimonGame extends Component {
  constructor() {
    super();

    this.state = {
      game: ['red', 'blue', 'green'],
      red: false,
      green: false,
      blue: false,
      yellow: false,
    };

    this.runGame = this.runGame.bind(this);
  }

  runGame() {
    const enlight = (color) => {
      return new Promise((resolve) => {
        this.setState({ [color]: !this.state[color] });
        setTimeout(() => {
          this.setState({ [color]: !this.state[color] });
          resolve();
        }, 1000);
      });

    };
    this.state.game.reduce((acc, colors) =>
      acc.then(() => enlight(colors)), Promise.resolve());
  }

  render() {
    return <div>
      <Link to="/" className="link link-home">Home</Link>
      <div className="title">Simon Game</div>
      <div className="simon">
        <div className="left">
          <div className={this.state.red ? "led red highlight" : "led red"}></div>
          <div className={this.state.yellow ? "led yellow highlight" : "led yellow"}></div>
        </div>
        <div className="simon-control">
          <div className="title">Simon</div>
          <div className="control">
            <div className="btn btn-long" onClick={this.runGame}>Start</div>
          </div>
        </div>
        <div className="right">
          <div className={this.state.green ? "led green highlight" : "led green"}></div>
          <div className={this.state.blue ? "led blue highlight" : "led blue"}></div>
        </div>
      </div>
    </div>
  }
}
