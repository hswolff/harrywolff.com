'use strict';

require('./styles.less');

const React = require('react');
const DocumentTitle = require('react-document-title');

const BlogPost = require('../../components/blogPost');
const SquareBox = require('../../components/squareBox');

const fluxMixin = require('flummox/mixin');

module.exports = React.createClass({
  mixins: [
    fluxMixin(['social'])
  ],

  render: function() {
    return (
      <div className="row">
        <DocumentTitle title="Home | Harry Wolff" />
        <div className="col-md-12 no-gutter blog-post-container">
          {(this.renderTileSeparater('Blog Posts', 'http://blog.hswolff.com/'))}
          {(this.renderBlogPosts())}
        </div>
      </div>
    );
  },

  renderTileSeparater(title, url) {
    return (
      <SquareBox className="tile-separater" href={url}>
        <div className="blog-post-head">
          <div className="tile-title">
            {title}
          </div>
        </div>
      </SquareBox>
    );
  },

  renderBlogPosts() {
    return this.state.blog.map(function(post, index) {
      return (<BlogPost key={index} {...post} />);
    });
  }
});
