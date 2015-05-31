'use strict';

require('./styles.less');

const utils = require('../../utils');

const React = require('react');
const DocumentTitle = require('react-document-title');

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
          <SquareBox
            className="tile-separater"
            title="Blog Posts"
            href="http://blog.hswolff.com/"
          />
          {(this.renderBlogPosts())}

          <SquareBox
            className="tile-separater"
            title="Linkroll"
            href="https://pinboard.in/u:hswolff"
          />
          {(this.renderPinterestPosts())}
        </div>
      </div>
    );
  },

  renderBlogPosts() {
    return this.state.blog.map(function(post, index) {
      return (
        <SquareBox
          key={index}
          href={post.url}
          title={post.title}
          subTitle={utils.prettyDate(post.date)}
          moreText={utils.trimString(post.excerpt, 30)}
        />
      );
    });
  },

  renderPinterestPosts() {
    return this.state.pinboard.map(function(item, index) {
      return (
        <SquareBox
          key={index}
          href={item.url}
          title={item.title}
          subTitle={item.tags.join(', ')}
        />
      );
    });
  }
});
