'use strict';

require('./styles.less');

const utils = require('../../utils');

const React = require('react');

const SquareBox = require('../squareBox');

const BlogPost = React.createClass({

  propTypes: {
    url: React.PropTypes.string,
    title: React.PropTypes.string,
    excerpt: React.PropTypes.string,
    date: React.PropTypes.number,
    tags: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string,
      url: React.PropTypes.string
    }))
  },

  getInitialState() {
    return {
    };
  },

  render() {
    return (
      <SquareBox href={this.props.url}>
        <div className="blog-post-head">
          <div className="blog-title">
            {this.props.title}
          </div>

          <div className="blog-date">{utils.prettyDate(this.props.date)}</div>
        </div>

        <div className="blog-excerpt">{utils.trimString(this.props.excerpt, 30)}</div>
      </SquareBox>
    );
  }
});

module.exports = BlogPost;
