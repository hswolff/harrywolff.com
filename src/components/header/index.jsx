require('./styles.less');

import React from 'react';

import Nav from '../nav';

export default class Header extends React.Component {
  render() {
    return (
      <header className="row header">
        <div className="col-xs-12">
          <div className="header-link">
            <h1 className="header-text">Harry</h1>
            <div className="header-link-img" />
            <h1 className="header-text">Wolff</h1>
          </div>
        </div>

        <Nav />
      </header>
    );
  }
}
