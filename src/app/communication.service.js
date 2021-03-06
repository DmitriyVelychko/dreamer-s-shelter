const Communication = {
  jsonp(url, callback) {
    const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`;
    const script = document.createElement('script');
    window[callbackName] = (data) => {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  },
  getCurrentLocation() {
    return fetch('http://ip-api.com/json')
      .then(res => res.json())
  },
  getLocalWeather() {
    const apiKey = 'd3c2ac56d73054085acc65c023cc88e3';
    return this.getCurrentLocation()
      .then((res) => {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${res.city}&APPID=${apiKey}`)
          .then(res => res.json())
          .then((res) => {
            return {
              degree: Math.round(res.main.temp - 273),
              city: res.name,
              country: res.sys.country,
              icon: `http://openweathermap.org/img/w/${res.weather[0].icon}.png`
            }
          })
      });
  },
  getRandomQuote() {
    const quoteId = Math.round(Math.random() * 1000);
    return fetch(`http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=${quoteId}`)
      .then(res => res.json())
      .then((res) => {
        return {
          quote: res[0].content.replace(/[<p>,<\/p>]/g, ''),
          author: res[0].title,
        }
      })
  },
  getWikipediaArticles(searchText) {
    const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${searchText}&callback=JSON_CALLBACK`;
    return new Promise((suc) => {
      this.jsonp(url, (data) => {
        suc(data.query.pages);
      });
    });
  },
};

export default Communication;
