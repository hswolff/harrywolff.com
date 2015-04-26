'use strict';

const React = require('react');
const {
  DefaultRoute,
  Route,
} = require('react-router');

const App = require('./components/App');
const Home = require('./components/Page/Home');
const About = require('./components/Page/About');

module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="about" handler={About}/>
    <DefaultRoute handler={Home}/>
  </Route>
);
