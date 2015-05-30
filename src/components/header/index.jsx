'use strict';

require('./styles.less');

const React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <header className="container-fluid header">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <a href="http://blog.hswolff.com/" className="header-link">
              <h1 className="header-text">Harry <div className="header-link-img" /> Wolff</h1>
            </a>
          </div>
        </div>
      </header>
    );
  }
});
