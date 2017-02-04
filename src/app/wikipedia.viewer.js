import React, { Component } from 'react';
import { Link } from 'react-router';

import Communication from './communication.service';

export default class WikipediaViewer extends Component {

  constructor() {
    super();

    this.state = {
      searchText: '',
      articleList: [],
    };

    this.getData = this.getData.bind(this);
    this.enterSearchText = this.enterSearchText.bind(this);
    this.getWiki = this.getWiki.bind(this);
  }

  static createArticle(title, text, link) {
    return <a className="wiki-info" href={link} target="_blank">
      <h3>{title}</h3>
      <p>{text}</p>
    </a>
  }

  getWiki(data) {
    const newData = data.query.pages;
    for (const i in newData) {
      if ({}.hasOwnProperty.call(newData, i)) {
        const title = newData[i].title;
        const text = newData[i].extract;
        const link = `http://en.wikipedia.org/wiki?curid=${newData[i].pageid}`;
        this.state.articleList.push(WikipediaViewer.createArticle(title, text, link))
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
      <div className="wrapper">
        {this.state.articleList}
      </div>
    </div>
  }
}
