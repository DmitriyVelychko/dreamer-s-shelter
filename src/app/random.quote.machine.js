import React, { Component } from 'react';
import { Link } from 'react-router';
import Communication from './communication.service';

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
    Communication.getRandomQuote()
      .then((res) => {
        const quote = res.quote;
        let twitterSlice = quote;
        if (twitterSlice.length > 101) {
          twitterSlice = twitterSlice.slice(0, 100);
          twitterSlice += '...'
        }
        this.setState({
          tweetHref: `https://twitter.com/intent/tweet?text=${twitterSlice} (c) ${res.author}`.replace(/\;/g, ''),
          quote,
          author: `- ${res.author}`
        })
      });
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
