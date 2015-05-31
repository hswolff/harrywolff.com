'use strict';

require('./styles.less');

const React = require('react');

const SquareBox = React.createClass({

  propTypes: {
    href: React.PropTypes.string,
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    subTitle: React.PropTypes.string,
    moreText: React.PropTypes.string
  },

  render() {
    return (
      <a href={this.props.href} className={'square-box col-md-3 ' + (this.props.className || '')}>
        <div className="square-box-head">
          <div className="square-box-title">
            {this.props.title}
          </div>

          <div className="square-box-subTitle">{this.props.subTitle}</div>
        </div>

        {this.props.moreText ? (
          <div className="square-box-moreText">{this.props.moreText}</div>
        ) : null}
      </a>
    );
  }
});

module.exports = SquareBox;
