'use strict';

require('./styles.less');

const React = require('react');

const SquareBox = React.createClass({

  propTypes: {
    href: React.PropTypes.string,
    className: React.PropTypes.string
  },

  render() {
    return (
      <a href={this.props.href} className={'square-box col-md-3 ' + (this.props.className || '')}>
        {this.props.children}
      </a>
    );
  }
});

module.exports = SquareBox;
