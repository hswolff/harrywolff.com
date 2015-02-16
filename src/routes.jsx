let React = require('react/addons');
let Router = require('react-router');

let {
  DefaultRoute,
  Link,
  Route,
  RouteHandler
} = Router;


var Test = React.createClass({
  render: function () {
    return (
      <div>
        <h3>My Test!</h3>
      </div>
    );
  }
});

const App = require('./components/App');
const Homepage = require('./components/Homepage');

module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="test" handler={Test}/>
    <DefaultRoute handler={Homepage}/>
  </Route>
);
