'use strict';

const React = require('react');
const {
  DefaultRoute,
  Route,
} = require('react-router');

const App = require('./components/app');
const Home = require('./pages/home');
const About = require('./pages/about');

module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="about" handler={About}/>
    <DefaultRoute handler={Home}/>
  </Route>
);
