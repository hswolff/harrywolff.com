require('./styles.less');

import React from 'react';

import {
  RouteHandler
} from 'react-router';

import DocumentTitle from 'react-document-title';

import Header from '../header';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <DocumentTitle title="Harry Wolff" />
        <Header />

        <RouteHandler/>
      </div>
    );
  }
}
