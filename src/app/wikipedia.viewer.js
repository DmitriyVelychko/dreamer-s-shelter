import React, { Component } from 'react';
import { Link } from 'react-router';


export default class WikipediaViewer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
        const articleList = document.querySelector('.wrapper');
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
            articleList.className = "wrapper show";
            link.appendChild(title);
            link.appendChild(info);
          }
        }
      };

      const inputField = document.querySelector('.input');

      const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${inputField.value}&callback=JSON_CALLBACK`;

      jsonp(url, getWiki);
    };

    document.querySelector('#search').addEventListener('click', getJsonp, false);
  }

  render() {
    return <div>
      <Link to="/" className="link link-home">Home</Link>
      <div className="title">Wikipedia Viewer </div>
      <a href="https://en.wikipedia.org/wiki/Special:Random"
         target="_blank"
         className="link">
        Get Random Article
      </a>
      <div className="block">
        <input className="input"/>
        <button id="search" className="btn btn-long">Find</button>
      </div>
      <div className="wrapper hide"></div>
    </div>
  }
}
