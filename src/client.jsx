let Router = require('react-router');

Router.run(require('./routes'), Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
