'use strict';

require('./styles.less');

const React = require('react');
const DocumentTitle = require('react-document-title');

const BlogPost = require('../../components/blogPost');

const fluxMixin = require('flummox/mixin');

module.exports = React.createClass({
  mixins: [fluxMixin(['blog'])],

  render: function() {
    return (
      <div className="container-fluid">
        <DocumentTitle title="Home | Harry Wolff" />
        <div className="row">
          <div className="col-md-12 no-gutter blog-post-container">

            <div className="blog-post tile-separater col-md-3">
              <div className="blog-post-head">
                <div className="tile-title">
                  Posts
                </div>
              </div>
            </div>

            {(this.renderBlogPosts())}
          </div>
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
