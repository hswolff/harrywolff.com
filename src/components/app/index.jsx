'use strict';

require('./styles.less');

const React = require('react');

const {
  RouteHandler
} = require('react-router');

const DocumentTitle = require('react-document-title');

const Header = require('../header');

module.exports = React.createClass({
  render() {
    return (
      <div className="container-fluid">
        <DocumentTitle title="Harry Wolff" />
        <Header />

        <RouteHandler/>
      </div>
    );
  }
});
