import React, {Component} from 'react';
import {Link} from 'react-router';


export default class LocalWeather extends Component {
  constructor(props) {
    super(props);
  }

  _getLocation() {
    fetch('http://ip-api.com/json')
      .then(res => res.text())
      .then(
        body => {
          this._getWeatherInfo(JSON.parse(body).city);
        }
      );
  }

  _getWeatherInfo(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d3c2ac56d73054085acc65c023cc88e3`)
      .then(
        res => res.text()
      )
      .then(
        body => {
          const data = JSON.parse(body);
          this._setWeather({
            city: data.name,
            country: data.sys.country,
            description: data.weather[0].main,
            icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            temp: Math.round(data.main.temp - 273)
          });
        }
      );
  }

  _setWeather(weather) {
    const degree = document.querySelector('#degree');
    document.getElementById('city').innerHTML = weather.city;
    document.getElementById('country').innerHTML = weather.country;
    degree.innerHTML = weather.temp;
    document.getElementById('icon').src = weather.icon;

    document.getElementById('toggle-degree')
      .addEventListener('click', () => {
        switch (this.innerHTML) {
          case 'C':
            degree.innerHTML = Math.round(degree.innerHTML * 9 / 5 + 32);
            this.innerHTML = 'F';
            break;
          case 'F':
            degree.innerHTML = Math.round((degree.innerHTML - 32) * 5 / 9);
            this.innerHTML = 'C';
            break;
          default:
            break;
        }
      }, false)
  }

  componentWillMount() {
    this._getLocation()
  }

  render() {
    return <div>
      <Link to="/" className="link link-home">Home</Link>
      <div className="title">Local Weather Info</div>
      <div className="wrapper">
        <div className="subtitle">
          <span id="city">City</span>,
          <span id="country">Country</span>
        </div>
        <div className="temperature">
          <div className="degrees">
            <div id="degree">#</div>
            <button className="btn" id="toggle-degree">C</button>
          </div>
          <img className="icon" id="icon" src="" alt="Icon"/>
        </div>
      </div>
    </div>
  }
}
