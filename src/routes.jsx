'use strict';

const React = require('react');
const {
  DefaultRoute,
  Route,
} = require('react-router');

const BlogStore = require('./stores/blog');
const PinboardStore = require('./stores/pinboard');

const App = require('./components/App');
const Home = require('./components/Page/Home');
const About = require('./components/Page/About');

module.exports = function(dataBootstrap=window.dataBootstrap) {
  BlogStore.bootstrap(dataBootstrap.blog);
  PinboardStore.bootstrap(dataBootstrap.pinboard);

  return (
    <Route name="app" path="/" handler={App}>
      <Route name="about" handler={About}/>
      <DefaultRoute handler={Home}/>
    </Route>
  );
};

