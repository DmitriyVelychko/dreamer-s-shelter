import React, { Component } from "react";
import { Link } from "react-router";
import Communication from "./communication.service";

const ArticleList = (props) => {
  const articles = props.articles.map((el, index) => {
    return <a className="wiki-info" key={index} href={el.link} target="_blank">
      <h3>{el.title}</h3>
      <p>{el.text}</p>
    </a>
  });
  return <div>{articles}</div>
};

export default class WikipediaViewer extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      articles: [],
    };

    this.enterSearchText = this.enterSearchText.bind(this);
    this.getWiki = this.getWiki.bind(this);
  }

  getWiki() {
    Communication.getWikipediaArticles(this.state.searchText)
      .then((data) => {
        const articles = [];
        Object.keys(data)
          .forEach((key) => {
            articles.push({
              title: data[key].title,
              text: data[key].extract,
              link: `http://en.wikipedia.org/wiki?curid=${data[key].pageid}`,
            });
          });
        this.setState({ articles });
      });
  }

  enterSearchText(event) {
    this.setState({ searchText: event.target.value });
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
                onClick={this.getWiki}
                className="btn btn-long">Find
        </button>
      </div>
      <div className="wrapper">
        <ArticleList articles={this.state.articles} />
      </div>
    </div>
  }
}
