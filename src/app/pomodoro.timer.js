import React, { Component } from 'react';
import { Link } from 'react-router';


export default class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = { workTime: 25, restTime: 5, pomodoroSeconds: 0, pomodoroMinutes: 25 };

    this.changeWorkTime = this.changeWorkTime.bind(this);
    this.changeRestTime = this.changeRestTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  changeWorkTime(time) {
    const workTime = this.state.workTime += time;
    this.setState({ workTime });
    this.setState({ pomodoroMinutes: this.state.workTime });
  }

  changeRestTime(time) {
    const restTime = this.state.restTime += time;
    this.setState({ restTime });
  }

  startTimer() {
    this.setState({ pomodoroMinutes: this.state.workTime - 1 });
    this.setState({ pomodoroSeconds: 59 });
    const timer = setInterval(() => {
      const pomodoroSeconds = this.state.pomodoroSeconds -= 1;
      if (pomodoroSeconds < 0) {
        if(this.state.pomodoroMinutes > 0) {
          this.setState({ pomodoroSeconds: 59 });
          this.setState({ pomodoroMinutes: this.state.pomodoroMinutes - 1 });
        }
        else {
          clearInterval(timer);
        }
        return
      }
      this.setState({ pomodoroSeconds });
    }, 1000);
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
