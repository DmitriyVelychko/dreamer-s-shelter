import React, { Component } from 'react';
import { Link } from 'react-router';


export default class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <Link to="/" className="link link-home">Home</Link>
      <div className="title">Pomodoro Timer</div>
      <div className="wrapper">
        <div className="timer-control">
          <div className="timer-group">
            <button className="btn">-</button>
            <div>5</div>
            <button className="btn">+</button>
          </div>
          <div className="timer-group">
            <button className="btn">-</button>
            <div>25</div>
            <button className="btn">+</button>
          </div>
        </div>
        <div className="clock">
          <div className="time">
            25:00
          </div>
        </div>
      </div>
    </div>
  }
}
