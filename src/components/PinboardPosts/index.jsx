'use strict';

require('./styles.less');

const React = require('react');

const Reflux = require('reflux');

const PinboardStore = require('../../stores/pinboard');

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentWillMount() {
    this.listenTo(PinboardStore, this.onPinboardChange);
  },

  onPinboardChange(newPinboard) {
    this.setState({
      pinboardItems: newPinboard
    });
  },

  getInitialState() {
    return {
      pinboardItems: PinboardStore.getData()
    };
  },

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
    return this.state.pinboardItems.map(function(post, index) {
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
