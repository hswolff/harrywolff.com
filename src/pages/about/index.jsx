require('./styles.less');

import React from 'react';

import ExternalNetworkIcon from '../../components/externalNetworkIcon';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="row page-about">
        <div className="col-md-12 no-gutter about-banner-container">
          <img src="/images/background_about.jpg" className="about-banner about-banner-default" />
          <img src="/images/background_about_hover.jpg" className="about-banner about-banner-hover" />

          <h2 className="about-banner-text">Harry Wolff. Wolff with two fs. The extra &lsquo;f&rsquo; is for good luck.</h2>
        </div>

        <div className="col-md-12 about-social-networks">
          <h3>Find Me Online</h3>

          <div className="external-networks">
            <ExternalNetworkIcon url="https://twitter.com/hswolff" title="Twitter" />
            <ExternalNetworkIcon url="https://www.facebook.com/harrywolff" title="Facebook" />
            <ExternalNetworkIcon url="https://foursquare.com/hswolff" title="Foursquare" />
            <ExternalNetworkIcon url="http://instagram.com/hswolff" title="Instagram" />
            <ExternalNetworkIcon url="https://plus.google.com/+HarryWolff" title="Google+" />
            <ExternalNetworkIcon url="http://www.linkedin.com/in/hswolff" title="LinkedIn" />
            <ExternalNetworkIcon url="https://github.com/hswolff" title="GitHub" />
          </div>
        </div>
      </div>
    );
  }
}
