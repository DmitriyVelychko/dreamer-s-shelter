import React, { Component } from 'react';
import { Link } from 'react-router';


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
    this.fetchWeatherByLocation();
  }

  fetchWeatherByLocation() {
    fetch('http://ip-api.com/json')
      .then(res => res.text())
      .then((body) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${JSON.parse(body).city}&APPID=d3c2ac56d73054085acc65c023cc88e3`)
          .then(res => res.text())
          .then((body) => {
            this.setWeatherCondition(JSON.parse(body))
          })
      });
  }

  setWeatherCondition(data) {
    this.setState({
      degree: Math.round(data.main.temp - 273),
      city: data.name,
      country: data.sys.country,
      icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
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
