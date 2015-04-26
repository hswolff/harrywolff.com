'use strict';

require('./styles.less');

const React = require('react');

const fluxMixin = require('flummox/mixin');

module.exports = React.createClass({
  mixins: [fluxMixin(['pinboard'])],

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {this.renderPinboardItems()}
          </div>
        </div>
      </div>
    );
  },

  renderPinboardItems() {
    return this.state.items.map(function(post, index) {
      return (
        <div key={index}>
          <a href={post.url}>{post.title}</a>
          date: {post.date}
          tags: {post.tags}
          <hr/>
        </div>
      );
    });
  }
});
