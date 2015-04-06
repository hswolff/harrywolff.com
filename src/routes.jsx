'use strict';

const React = require('react');
const {
  DefaultRoute,
  Route,
} = require('react-router');

const BlogStore = require('./stores/blog');
const PinboardStore = require('./stores/pinboard');


var Test = React.createClass({
  render: function() {
    return (
      <div>
        <h3>My Test!</h3>
      </div>
    );
  }
});

const App = require('./components/App');
const Homepage = require('./components/Homepage/Homepage');

module.exports = function(dataBootstrap=window.dataBootstrap) {
  BlogStore.bootstrap(dataBootstrap.blog);
  PinboardStore.bootstrap(dataBootstrap.pinboard);

  return (
    <Route name="app" path="/" handler={App}>
      <Route name="test" handler={Test}/>
      <DefaultRoute handler={Homepage}/>
    </Route>
  );
};

