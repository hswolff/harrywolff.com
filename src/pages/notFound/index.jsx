require('./styles.less');

import React from 'react';
import DocumentTitle from 'react-document-title';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="row page-notFound">
        <DocumentTitle title="404 | Harry Wolff" />

        <h2 className="notFound-text">404</h2>
        <h3 className="notFound-text">This is not the page you're looking for.</h3>

      </div>
    );
  }
}
