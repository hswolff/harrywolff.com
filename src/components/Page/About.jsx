'use strict';

require('./About.less');

const React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1>About</h1>
          </div>
        </div>
      </div>
    );
  }
});
