import React, { Component } from 'react';
import { Link } from 'react-router';


export default class RandomQuoteMachine extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var getQuote = function () {
      var xhr = new XMLHttpRequest();
      var rand = Math.round(Math.random() * 1000);
      xhr.open('GET', "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=" + rand, true);
      xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        var content = data[0].content.replace(/[<p>,<\/p>]/g, "");
        document.querySelector('.quote').innerHTML = content;
        document.querySelector('.author').innerHTML = '- ' + data[0].title;
        var href = document.querySelector('.quote').innerHTML;
        if (href.length > 101) {
          href = href.slice(0, 100);
          href += "..."
        }
        document.querySelector('.tweet').href = "https://twitter.com/intent/tweet?text=" + href + " (c) " + data[0].title;
      };
      xhr.send();
    }

    var openURL = function () {
      event.preventDefault();
      var str = window.open(this.href, 'Twitter', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
    }
    document.querySelector('#next-quote').addEventListener('click', getQuote, false);
    document.querySelector('.tweet').addEventListener('click', openURL, true);

    getQuote();

  }

  render() {
    return <div>
      <Link to="/" className="link link-home">Home</Link>
      <div className="title">Random Quote Machine</div>
      <div className="wrapper">
        <blockquote className="quote"></blockquote>
        <div className="author"></div>
        <div className="navigate"><a href="#" className="tweet">
          <i></i>
          <span>Tweet</span></a>
          <button id="next-quote" className="btn btn-long">Next Quote</button>
        </div>
      </div>
    </div>
  }
}
