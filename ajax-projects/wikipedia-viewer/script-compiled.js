'use strict';

var getJsonp = function getJsonp() {
  var jsonp = function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');
    window[callbackName] = function (data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  };

  var getWiki = function getWiki(data) {
    var articleList = document.querySelector('.article-list');
    articleList.innerHTML = '';
    if (!data.query) {
      var err = document.createElement('p');
      err.className = 'error';
      err.innerHTML = 'There were no results matching the query.';
      articleList.appendChild(err);
      return;
    }

    var newData = data.query.pages;
    for (var i in newData) {
      if ({}.hasOwnProperty.call(newData, i)) {
        var link = document.createElement('a');
        var title = document.createElement('h3');
        var info = document.createElement('p');
        link.className = 'wiki-info';
        link.href = 'http://en.wikipedia.org/wiki?curid=' + newData[i].pageid;
        link.target = '_blank';
        title.innerHTML = newData[i].title;
        info.innerHTML = newData[i].extract;
        articleList.appendChild(link);
        link.appendChild(title);
        link.appendChild(info);
      };
    }
  };

  var inputField = document.querySelector('.search-input');

  var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + inputField.value + '&callback=JSON_CALLBACK';

  jsonp(url, getWiki);
};

document.querySelector('.search-btn').addEventListener('click', getJsonp, false);

//# sourceMappingURL=script-compiled.js.map