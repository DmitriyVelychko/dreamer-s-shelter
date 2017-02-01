import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RandomQuoteMachine extends Component {
  constructor() {
    super();

    this.state = {
      quote: '',
      author: '',
      tweetHref: '#',
    };

    this.getQuote = this.getQuote.bind(this);
  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote() {
    const quoteId = Math.round(Math.random() * 1000);
    fetch(`http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=${quoteId}`)
      .then(
        res => res.text()
      )
      .then(
        body => {
          const data = JSON.parse(body);
          const quote = data[0].content.replace(/[<p>,<\/p>]/g, '');
          let twitterSlice = quote;
          if (twitterSlice.length > 101) {
            twitterSlice = twitterSlice.slice(0, 100);
            twitterSlice += '... '
          }
          this.setState({
            tweetHref: `https://twitter.com/intent/tweet?text=${twitterSlice}(c) ${data[0].title}`.replace(/\;/g, ''),
            quote,
            author: `- ${data[0].title}`
          })
        }
      );
  }


  render() {
    return <div>
      <Link to='/' className='link link-home'>Home</Link>
      <div className='title'>Random Quote Machine</div>
      <div className='wrapper'>
        <div id='quote-text'>{this.state.quote}</div>
        <div id='author'>{this.state.author}</div>
        <div className='navigate'>
          <a href={this.state.tweetHref} target='_blank' id='tweet'>
            <span>Tweet</span></a>
          <button className='btn btn-long' onClick={this.getQuote}>Next Quote</button>
        </div>
      </div>
    </div>
  }
}
