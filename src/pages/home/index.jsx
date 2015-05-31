'use strict';

require('./styles.less');

const React = require('react');
const DocumentTitle = require('react-document-title');

const BlogPost = require('../../components/blogPost');
const SquareBox = require('../../components/squareBox');

const fluxMixin = require('flummox/mixin');

module.exports = React.createClass({
  mixins: [
    fluxMixin(['blog'])
  ],

  render: function() {
    return (
      <div className="row">
        <DocumentTitle title="Home | Harry Wolff" />
        <div className="col-md-12 no-gutter blog-post-container">

          <SquareBox className="tile-separater" href="http://blog.hswolff.com/">
            <div className="blog-post-head">
              <div className="tile-title">
                Blog Posts
              </div>
            </div>
          </SquareBox>

          {(this.renderBlogPosts())}
        </div>
      </div>
    );
  },

  renderBlogPosts() {
    return this.state.items.map(function(post, index) {
      return (<BlogPost key={index} {...post} />);
    });
  }
});
