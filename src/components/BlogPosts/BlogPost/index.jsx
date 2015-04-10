'use strict';

require('./styles.less');

const React = require('react');

const BlogPost = React.createClass({

  propTypes: {
    url: React.PropTypes.string,
    title: React.PropTypes.string,
    excerpt: React.PropTypes.string,
    date: React.PropTypes.string,
    tags: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string,
      url: React.PropTypes.string
    }))
  },

  getInitialState() {
    return {
    };
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <a href={this.props.url}>title: {this.props.title}</a>
            <span>excerpt: {this.props.excerpt}</span>
            <span>date: {this.props.date}</span>
            <span>tags: {this.props.tags}</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BlogPost;
