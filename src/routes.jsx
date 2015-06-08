import React from 'react';
import {
  DefaultRoute,
  NotFoundRoute,
  Route
} from 'react-router';

import App from './components/app';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import NotFoundPage from './pages/notFound';

export default (
  <Route path="/" handler={App}>
    <Route name="about" handler={AboutPage}/>
    <DefaultRoute name="home" handler={HomePage}/>
    <NotFoundRoute handler={NotFoundPage}/>
  </Route>
);
