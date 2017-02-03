import React, { Component } from 'react';
import { Link } from 'react-router';

import Communication from './communication.service';

export default class WikipediaViewer extends Component {

  constructor() {
    super();

    this.state = {
      searchText: '',
    };

    this.getData = this.getData.bind(this);
    this.enterSearchText = this.enterSearchText.bind(this);
  }

  getWiki(data) {
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
  }

  enterSearchText(event) {
    this.setState({ searchText: event.target.value });
  }

  getData() {
    const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${this.state.searchText}&callback=JSON_CALLBACK`;
    Communication.jsonp(url, this.getWiki);
  }

  render() {
    return <div>
      <Link to="/" className="link link-home">Home</Link>
      <div className="title">Wikipedia Viewer</div>
      <a href="https://en.wikipedia.org/wiki/Special:Random"
         target="_blank" className="link">
        Get Random Article
      </a>
      <div className="block">
        <input className="input"
               value={this.state.searchText}
               onChange={this.enterSearchText} />
        <button id="search"
                onClick={this.getData}
                className="btn btn-long">Find
        </button>
      </div>
      <div className="wrapper hide"></div>
    </div>
  }
}
