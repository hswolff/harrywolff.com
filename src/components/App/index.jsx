'use strict';

require('./styles.less');

const React = require('react');

const {
  Link,
  RouteHandler
} = require('react-router');

const DocumentTitle = require('react-document-title');

const Reflux = require('reflux');

const BlogStore = require('../../stores/blog');
const PinboardStore = require('../../stores/pinboard');

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentWillMount() {
    this.listenTo(BlogStore, this.onBlogChange);
    this.listenTo(PinboardStore, this.onPinboardChange);
  },

  onBlogChange(newBlog) {
    this.setState({
      blogPosts: newBlog
    });
  },

  onPinboardChange(newPinboard) {
    this.setState({
      pinboardItems: newPinboard
    });
  },

  getInitialState() {
    return {
      blogPosts: BlogStore.getData(),
      pinboardItems: PinboardStore.getData()
    };
  },

  render() {
    return (
      <div>
        <DocumentTitle title="Harry Wolff" />
        <header style={{display: 'none'}}>
          <ul>
            <li><Link to="app">Dashboard</Link></li>
            <li><Link to="test">Test</Link></li>
          </ul>
          Logged in as Jane
        </header>

        {/*this.renderBlogPosts()*/}
        {/*this.renderPinboardItems()*/}

        <RouteHandler/>
      </div>
    );
  },

  renderBlogPosts() {
    return this.state.blogPosts.map(function(post, index) {
      return (
        <div key={index}>
          <a href={post.url}>{post.title}</a>
          excerpt: {post.excerpt}
          date: {post.date}
          tags: {post.tags}
          <hr/>
        </div>
      );
    });
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
