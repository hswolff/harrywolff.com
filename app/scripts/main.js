require('../styles/normalize.css');
require('../styles/twitter-tooltip.css');
require('../styles/main.css');

window.jQuery = window.$ = require('jquery');
require('./twitter-tooltip');

$('#external-networks a').tooltip({
  placement: 'bottom',
  title: 'bob'
});

var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

React.render(<HelloMessage name="John" />, document.querySelector('.welcome'));
