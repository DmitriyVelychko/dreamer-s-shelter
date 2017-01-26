import React, { Component } from 'react';
import { Link } from 'react-router';


export default class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = { workTime: 25, restTime: 5 };

    this.changeWorkTime = this.changeWorkTime.bind(this);
    this.changeRestTime = this.changeRestTime.bind(this);

  }

  changeWorkTime(time) {
    const workTime = this.state.workTime += time;
    this.setState({ workTime });
  }

  changeRestTime(time) {
    const restTime = this.state.restTime += time;
    this.setState({ restTime });
  }

  render() {
    return <div>
      <Link to="/" className="link link-home">Home</Link>
      <div className="title">Pomodoro Timer</div>
      <div className="wrapper">
        <div className="timer-control">
          <div className="timer-group">
            <button className="btn" onClick={() => this.changeRestTime(-1)}>-</button>
            <div>{this.state.restTime}</div>
            <button className="btn" onClick={() => this.changeRestTime(1)}>+</button>
          </div>
          <div className="timer-group">
            <button className="btn" onClick={() => this.changeWorkTime(-5)}>-</button>
            <div>{this.state.workTime}</div>
            <button className="btn" onClick={() => this.changeWorkTime(5)}>+</button>
          </div>
        </div>
        <div className="clock">
          <div className="time">
            {this.state.workTime}
          </div>
        </div>
        <div>
          <button className="btn btn-long">Start</button>
        </div>
      </div>
    </div>
  }
}
