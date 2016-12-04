const getJsonp = () => {
  const jsonp = (url, callback) => {
    const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`;
    const script = document.createElement('script');
    window[callbackName] = (data) => {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  };

  const getWiki = (data) => {
    const articleList = document.querySelector('.article-list');
    articleList.innerHTML = '';
    if (!data.query) {
      const err = document.createElement('p');
      err.className = 'error';
      err.innerHTML = 'There were no results matching the query.';
      articleList.appendChild(err);
      return;
    }

    const newData = data.query.pages;
    for (const i in newData) {
      if ({}.hasOwnProperty.call(newData, i)) {
        const link = document.createElement('a');
        const title = document.createElement('h3');
        const info = document.createElement('p');
        link.className = 'wiki-info';
        link.href = `http://en.wikipedia.org/wiki?curid=${newData[i].pageid}`;
        link.target = '_blank';
        title.innerHTML = newData[i].title;
        info.innerHTML = newData[i].extract;
        articleList.appendChild(link);
        link.appendChild(title);
        link.appendChild(info);
      }
    }
  };

  const inputField = document.querySelector('.search-input');

  const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${inputField.value}&callback=JSON_CALLBACK`;

  jsonp(url, getWiki);
};

document.querySelector('.search-btn').addEventListener('click', getJsonp, false);
