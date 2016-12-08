import React, { Component } from 'react';
import { Link } from 'react-router';


export default class RandomQuoteMachine extends Component {
  constructor(props) {
    super(props);
  }

  _getQuote() {
    const quoteId = Math.round(Math.random() * 1000);
    fetch(`http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=${quoteId}`)
      .then(
        res => res.text()
      )
      .then(
        body => {
          const data = JSON.parse(body);
          let quote = document.getElementById('quote-text');
          quote.innerHTML = data[0].content.replace(/[<p>,<\/p>]/g, '');
          document.getElementById('author').innerHTML = '- ' + data[0].title;
          let slice = quote.innerHTML;
          if (slice.length > 101) {
            slice = slice.slice(0, 100);
            slice += '... '
          }
          const tweet = `https://twitter.com/intent/tweet?text=${slice}(c) ${data[0].title}`.replace(/\;/g, '');
          document.getElementById('tweet').href = tweet;
        }
      );
  }

  componentDidMount() {
    this._getQuote();
    document.getElementById('next-quote').addEventListener('click', this._getQuote);
  }

  render() {
    return <div>
      <Link to='/' className='link link-home'>Home</Link>
      <div className='title'>Random Quote Machine</div>
      <div className='wrapper'>
        <blockquote id='quote-text'></blockquote>
        <div id='author'></div>
        <div className='navigate'>
          <a href='' target='_blank' id='tweet'>
          <i></i>
          <span>Tweet</span></a>
          <button id='next-quote' className='btn btn-long'>Next Quote</button>
        </div>
      </div>
    </div>
  }
}
