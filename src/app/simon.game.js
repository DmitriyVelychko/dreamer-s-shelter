import React, { Component } from 'react';
import { Link } from 'react-router';

const helper = () => {
  let clickNum = -1;
  return () => {
    return clickNum += 1;
  }
};

export default class SimonGame extends Component {
  constructor() {
    super();

    this.state = {
      game: [],
      red: false,
      green: false,
      blue: false,
      yellow: false,
      isGame: false,
      isGameChaining: false,
    };

    this.runGame = this.runGame.bind(this);
    this.counter = helper();
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
    this.setState({isGameChaining: !this.state.isGameChaining});
    const finalRound = this.state.game.length === 10;
    this.setState({ [color]: !this.state[color] });
    setTimeout(() => {
      this.setState({isGameChaining: !this.state.isGameChaining});
      this.setState({ [color]: !this.state[color] });
      if (color === this.state.game[this.counter()]) {
        if (finalRound) {
          console.info('You win');
          this.counter = helper();
        } else {
          this.runGame();
        }
      } else {
        console.error('You lose');
      }
    }, 750)
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
               disabled={this.state.isGameChaining}
               onClick={() => this.gamePick('red')}>
          </div>
          <div className={this.state.yellow ? "led yellow highlight" : "led yellow"}
               disabled={this.state.isGameChaining}
               onClick={() => this.gamePick('yellow')}>
          </div>
        </div>
        <div className="simon-control">
          <div className="title">Simon</div>
          <div>Series {this.state.game.length}</div>
          <div className="control">
            <div className="btn btn-long"
                 disabled={this.state.isGame}
                 onClick={this.runGame}>Start
            </div>
          </div>
        </div>
        <div className="right">
          <div className={this.state.green ? "led green highlight" : "led green"}
               disabled={this.state.isGameChaining}
               onClick={() => this.gamePick('green')}>
          </div>
          <div className={this.state.blue ? "led blue highlight" : "led blue"}
               disabled={this.state.isGameChaining}
               onClick={() => this.gamePick('blue')}>
          </div>
        </div>
      </div>
    </div>
  }
}
