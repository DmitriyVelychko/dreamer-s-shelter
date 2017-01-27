import React, { Component } from 'react';
import { Link } from 'react-router';

const defaultSetup = {
  workTime: 25,
  restTime: 5,
  pomodoroSeconds: 0,
  pomodoroMinutes: 25,
  isWork: true,
};

export default class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, defaultSetup);

    this.changeWorkTime = this.changeWorkTime.bind(this);
    this.changeRestTime = this.changeRestTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
  }

  changeWorkTime(time) {
    const workTime = this.state.workTime += time;
    this.setState({
      workTime
    });
    if (this.state.isWork) {
      this.setState({ pomodoroMinutes: workTime });
    }
  }

  changeRestTime(time) {
    const restTime = this.state.restTime += time;
    this.setState({ restTime });
    if (!this.state.isWork) {
      this.setState({ pomodoroMinutes: restTime });
    }
  }

  runTimer() {
    const second = 1000;
    const resetMinute = 59;
    this.setState({ pomodoroSeconds: resetMinute });
    const pomodoroClock = setInterval(() => {
      const pomodoroSeconds = this.state.pomodoroSeconds -= 1;
      if (pomodoroSeconds < 0) {
        if (this.state.pomodoroMinutes > 0) {
          this.setState({
            pomodoroSeconds: resetMinute,
            pomodoroMinutes: this.state.pomodoroMinutes - 1,
          });
        }
        else {
          clearInterval(pomodoroClock);
          this.setState({ isWork: !this.state.isWork });
          this.startTimer();
        }
        return
      }
      this.setState({ pomodoroSeconds });
    }, second);
  }

  startTimer() {
    const startUpMode = this.state.isWork ? this.state.workTime : this.state.restTime;
    this.setState({ pomodoroMinutes: startUpMode - 1 });
    this.runTimer();
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
            {this.state.pomodoroMinutes} : {this.state.pomodoroSeconds}
          </div>
        </div>
        <div>
          <button className="btn btn-long" onClick={this.startTimer}>Start</button>
        </div>
      </div>
    </div>
  }
}
