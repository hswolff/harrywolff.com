'use strict';

require('./styles.less');

const React = require('react');

const Reflux = require('reflux');

const BlogStore = require('../../stores/blog');

const BlogPost = require('./BlogPost');

const BlogPosts = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentWillMount() {
    this.listenTo(BlogStore, this.onBlogChange);
  },

  onBlogChange(newBlog) {
    this.setState({
      blogPosts: newBlog
    });
  },

  getInitialState() {
    return {
      blogPosts: BlogStore.getData()
    };
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {this.renderBlogPosts()}
          </div>
        </div>
      </div>
    );
  },

  renderBlogPosts() {
    return this.state.blogPosts.map(function(post, index) {
      return (<BlogPost key={index} {...post} />);
    });
  }
});

module.exports = BlogPosts;
