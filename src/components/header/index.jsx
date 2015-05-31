'use strict';

require('./styles.less');

const React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <header className="row header">
        <div className="col-md-12">
          <div className="header-link">
            <h1 className="header-text">Harry <div className="header-link-img" /> Wolff</h1>
          </div>
        </div>
      </header>
    );
  }
});
