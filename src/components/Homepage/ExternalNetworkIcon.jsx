'use strict';

require('./twitter-tooltip.css');

const React = require('react');
const {Tooltip, OverlayTrigger} = require('react-bootstrap');

module.exports = React.createClass({
  getImageNamed: function(name) {
    // @TODO: switch to use webpack's url-loader (and make server not barf on it).
    // return require('../../public/images/external-networks/' + name);
    return '/images/external-networks/' + name + '.png';
  },

  render: function() {
    return (
      <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>{this.props.title}</Tooltip>}>

        <a href={this.props.url} title={this.props.title}>
          <img src={this.getImageNamed(this.props.title.toLowerCase())} alt={this.props.title} />
        </a>
      </OverlayTrigger>
    );
  }
});
