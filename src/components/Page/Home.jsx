'use strict';

require('./Home.less');

const React = require('react');
const DocumentTitle = require('react-document-title');

const BlogPosts = require('../BlogPosts');
const PinboardPosts = require('../PinboardPosts');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <DocumentTitle title="Home | Harry Wolff" />
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1>Index</h1>

            <BlogPosts />

          </div>
        </div>
      </div>
    );
  }
});
