'use strict';

const React = require('react');
const {
  DefaultRoute,
  Route,
} = require('react-router');

const App = require('./components/app');
import HomePage from './pages/home';
import AboutPage from './pages/about';

module.exports = (
  <Route path="/" handler={App}>
    <Route name="about" handler={AboutPage}/>
    <DefaultRoute name="home" handler={HomePage}/>
  </Route>
);
