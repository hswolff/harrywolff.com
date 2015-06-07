require('./styles.less');

import React from 'react';

class SquareBox extends React.Component {
  render() {
    return (
      <a href={this.props.href} className={'square-box col-sm-3 ' + (this.props.className || '')}>
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
}

SquareBox.propTypes = {
  href: React.PropTypes.string,
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  subTitle: React.PropTypes.string,
  moreText: React.PropTypes.string
};

export default SquareBox;
