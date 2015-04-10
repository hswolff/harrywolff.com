'use strict';

require('./styles.less');

const React = require('react');

const {
  RouteHandler
} = require('react-router');

const DocumentTitle = require('react-document-title');

const Header = require('../Header');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <DocumentTitle title="Harry Wolff" />
        <Header />

        <RouteHandler/>
      </div>
    );
  }
});
