require('./styles.less');

import React from 'react';

import {
  Link
} from 'react-router';

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="col-md-12 main-nav">
        <div className="col-md-12">
          {this.renderNavItem('home', 'Home')}
          {this.renderNavItem('about', 'About')}
        </div>
      </nav>
    );
  }

  renderNavItem(link, text) {
    return (
      <Link to={link} className="main-navItem">{text}</Link>
    );
  }
}
