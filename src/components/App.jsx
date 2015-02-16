let React = require('react');

let {
  Link,
  RouteHandler
} = require('react-router');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <header>
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
