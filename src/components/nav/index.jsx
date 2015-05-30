'use strict';

require('./styles.less');

const React = require('react');

const {
  Link
} = require('react-router');

const Nav = React.createClass({

  render() {
    return (
      <nav className="row main-nav">
        <div className="col-md-12">
          {this.renderNavItem('app', 'Home')}
          {this.renderNavItem('about', 'About')}
        </div>
      </nav>
    );
  },

  renderNavItem(link, text) {
    return (
      <Link to={link} className="main-navItem">{text}</Link>
    );
  }
});

module.exports = Nav;
