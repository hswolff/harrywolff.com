'use strict';

require('./styles.less');

const React = require('react');

const {
  Link
} = require('react-router');

const Nav = React.createClass({

  render() {
    return (
      <nav className="row">
        <ul className="col-md-12 main-nav">
          {this.renderNavItem('app', 'Home')}
          {this.renderNavItem('about', 'About')}
        </ul>
      </nav>
    );
  },

  renderNavItem(link, text) {
    return (
      <li className="main-navItem">
        <Link to={link}>{text}</Link>
      </li>
    );
  }
});

module.exports = Nav;
