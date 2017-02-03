import React, { Component } from 'react';
import { Link } from 'react-router';
import Communication from './communication.service';

export default class LocalWeather extends Component {

  constructor() {
    super();
    this.state = {
      degree: '#',
      degreeScale: 'C',
      city: 'city',
      country: 'country',
      icon: '',
    };
    this.toggleDegree = this.toggleDegree.bind(this);
  }

  componentWillMount() {
    this.getLocalWeather();
  }

  getLocalWeather() {
    Communication.getLocalWeather()
      .then((res) => {
        this.setState(res);
      });
  }

  toggleDegree() {
    if (this.state.degreeScale === 'C') {
      this.setState({
        degreeScale: 'F',
        degree: Math.round(this.state.degree * 9 / 5 + 32),
      })
    }
    if (this.state.degreeScale === 'F') {
      this.setState({
        degreeScale: 'C',
        degree: Math.round((this.state.degree - 32) * 5 / 9),
      })
    }
  }


  render() {
    return <div>
      <Link to="/" className="link link-home">Home</Link>
      <div className="title">Local Weather Info</div>
      <div className="wrapper">
        <div className="subtitle">
          <span>{this.state.city}</span>, <span>{this.state.country}</span>
        </div>
        <div className="temperature">
          <div className="degrees">
            <div>{this.state.degree}</div>
            <button className="btn" onClick={this.toggleDegree}>{this.state.degreeScale}</button>
          </div>
          <img className="icon" id="icon" src={this.state.icon} alt="Icon" />
        </div>
      </div>
    </div>
  }
}
