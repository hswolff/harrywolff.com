require('./styles.less');

import React from 'react';

import Nav from '../nav';

export default class Header extends React.Component {
  render() {
    return (
      <header className="row header">
        <div className="col-md-12">
          <div className="header-link">
            <h1 className="header-text">Harry <div className="header-link-img" /> Wolff</h1>
          </div>
        </div>

        <Nav />
      </header>
    );
  }
}
