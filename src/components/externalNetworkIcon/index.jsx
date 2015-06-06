require('./styles.less');

import React from 'react';
import {
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';

class ExternalNetworkIcon extends React.Component {
  getImageNamed(name) {
    // @TODO: switch to use webpack's url-loader (and make server not barf on it).
    // return require('../../public/images/external-networks/' + name);
    return '/images/external-networks/' + name + '.png';
  }

  render() {
    return (
      <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{this.props.title}</Tooltip>}>

        <a href={this.props.url} title={this.props.title}>
          <img src={this.getImageNamed(this.props.title.toLowerCase())} alt={this.props.title} />
        </a>
      </OverlayTrigger>
    );
  }
}

ExternalNetworkIcon.propTypes = {
  title: React.PropTypes.string,
  url: React.PropTypes.string
};

export default ExternalNetworkIcon;
