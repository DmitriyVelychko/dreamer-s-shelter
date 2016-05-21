var getWeather = function () {
  var xhr = new XMLHttpRequest();

  var getLocation = function () {
    xhr.open('GET', "http://ip-api.com/json", true);
    xhr.onload = function () {
      getWeatherInfo(JSON.parse(xhr.responseText).city);
    };
    xhr.send();
  }

  var getWeatherInfo = function (city) {
    xhr.open('GET', "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=d3c2ac56d73054085acc65c023cc88e3", true);

    xhr.onload = function () {
      var data = JSON.parse(this.responseText)
      var weather = {
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].main,
        icon: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
        temp: Math.round(data.main.temp - 273)
      }
      setWeather(weather);

    }

    xhr.onerror = function () {
      console.log('Ошибка ' + this.status);
    }

    xhr.send();
  }

  var setWeather = function (options) {
    var temp = document.querySelector('.temp');
    document.querySelector('.city-info').innerHTML = options.city;
    document.querySelector('.country-info').innerHTML = options.country;
    temp.innerHTML = options.temp;
    document.querySelector('.description').innerHTML = options.description
    document.querySelector('.icon').src = options.icon;

    document.querySelector('button').addEventListener('click', function () {
      if (this.innerHTML === 'C') {
        temp.innerHTML = Math.round(temp.innerHTML * 9 / 5 + 32);
        this.innerHTML = 'F';
      } else if (this.innerHTML === 'F') {
        temp.innerHTML = Math.round((temp.innerHTML - 32) * 5 / 9);
        this.innerHTML = 'C';
      }
    }, false)
  }
  getLocation()
}

getWeather()