'use strict';

let React = require('react');

let {
  Link,
  RouteHandler
} = require('react-router');
const DocumentTitle = require('react-document-title');

module.exports = React.createClass({
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

        <RouteHandler/>
      </div>
    );
  }
});
