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
  }
};

export default Communication;
