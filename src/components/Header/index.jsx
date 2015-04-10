'use strict';

require('./styles.less');

const React = require('react');
const {
  Link
} = require('react-router');

const ExternalNetworkIcon = require('../ExternalNetworkIcon');

module.exports = React.createClass({
  render: function() {
    return (
      <header className="container-fluid header">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <a href="http://blog.hswolff.com/" className="header-link">
              <h1 className="header-text">Harry <div className="header-link-img" /> Wolff</h1>
            </a>

            <p className="welcome">Welcome back to my lovely abode!</p>

            <div id="external-networks" className="external-networks">
              <ExternalNetworkIcon url="https://twitter.com/hswolff" title="Twitter" />
              <ExternalNetworkIcon url="https://www.facebook.com/harrywolff" title="Facebook" />
              <ExternalNetworkIcon url="https://foursquare.com/hswolff" title="Foursquare" />
              <ExternalNetworkIcon url="http://instagram.com/hswolff" title="Instagram" />
              <ExternalNetworkIcon url="https://plus.google.com/+HarryWolff" title="Google+" />
              <ExternalNetworkIcon url="http://www.linkedin.com/in/hswolff" title="LinkedIn" />
              <ExternalNetworkIcon url="https://github.com/hswolff" title="GitHub" />
            </div>
          </div>

          <header style={{display: 'block'}}>
            <ul>
              <li><Link to="app">Dashboard</Link></li>
              <li><Link to="about">About</Link></li>
            </ul>
          </header>
        </div>
      </header>
    );
  }
});
