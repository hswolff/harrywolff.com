'use strict';

require('./styles.less');

const React = require('react');

const BlogPost = require('./BlogPost');

const fluxMixin = require('flummox/mixin');

const BlogPosts = React.createClass({
  mixins: [fluxMixin(['blog'])],

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
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

module.exports = BlogPosts;
