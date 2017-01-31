import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SimonGame extends Component {
  constructor() {
    super();

    this.state = {
      game: [],
      red: false,
      green: false,
      blue: false,
      yellow: false,
    };

    this.runGame = this.runGame.bind(this);
  }

  updateLightChain() {
    const colorPick = Math.floor(Math.random() * 100);
    switch (true) {
      case (colorPick < 25):
        this.state.game.push('green');
        break;
      case (colorPick >= 25 && colorPick < 50):
        this.state.game.push('red');
        break;
      case (colorPick >= 50 && colorPick < 75):
        this.state.game.push('blue');
        break;
      case (colorPick >= 75 && colorPick < 100):
        this.state.game.push('yellow');
        break;
      default:
        break;
    }
  }

  gamePick(color) {
    if (color === this.state.game[0]){
      this.state.game.shift();
      if(!this.state.game.length) {
        console.info('You win');
      }
    } else {
      this.setState({game: []});
      console.error('You lose');
    }
  }

  runGame() {
    this.updateLightChain();
    const enlight = (color) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.setState({ [color]: !this.state[color] });
        }, 1000);
        setTimeout(() => {
          this.setState({ [color]: !this.state[color] });
          resolve();
        }, 2000);
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
          <div className={this.state.red ? "led red highlight" : "led red"}
               onClick={() => this.gamePick('red')}>
          </div>
          <div className={this.state.yellow ? "led yellow highlight" : "led yellow"}
               onClick={() => this.gamePick('yellow')}>
          </div>
        </div>
        <div className="simon-control">
          <div className="title">Simon</div>
          <div className="control">
            <div className="btn btn-long" onClick={this.runGame}>Start</div>
          </div>
        </div>
        <div className="right">
          <div className={this.state.green ? "led green highlight" : "led green"}
               onClick={() => this.gamePick('green')}>
          </div>
          <div className={this.state.blue ? "led blue highlight" : "led blue"}
               onClick={() => this.gamePick('blue')}>
          </div>
        </div>
      </div>
    </div>
  }
}
