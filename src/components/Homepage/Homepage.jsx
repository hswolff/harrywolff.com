require('./twitter-tooltip.css');
require('./Homepage.less');


const React = require('react');

module.exports = React.createClass({
  componentDidMount: function() {
    window.jQuery = window.$ = require('jquery');
    require('./twitter-tooltip');
    
    $('#external-networks a').tooltip({
      placement: 'bottom',
      title: 'bob'
    });
  },

  render: function() {
    return (
      <div className="container">
        <h1>Harry Wolff</h1>

        <a href="http://blog.hswolff.com/" className="splash-image">
          <span>Blog</span>
          <div className="profile-picture" />
        </a>

        <p className="welcome">Welcome back to my lovely abode!</p>

        <div id="external-networks" className="external-networks">
          <a href="https://twitter.com/hswolff" title="Twitter">
            <img src="/images/external-networks/twitter.png" alt="twitter" />
          </a>
          <a href="https://www.facebook.com/harrywolff" title="Facebook">
            <img src="/images/external-networks/facebook.png" alt="facebook" />
          </a>
          <a href="https://foursquare.com/hswolff" title="Foursquare">
            <img src="/images/external-networks/foursquare.png" alt="foursquare" />
          </a>
          <a href="http://instagram.com/hswolff" title="Instagram">
            <img src="/images/external-networks/instagram.png" alt="instagram" />
          </a>
          <a href="https://plus.google.com/+HarryWolff" title="Google+">
            <img src="/images/external-networks/google+.png" alt="google+" />
          </a>
          <a href="http://www.linkedin.com/in/hswolff" title="LinkedIn">
            <img src="/images/external-networks/linkedin.png" alt="linkedin" />
          </a>
          <a href="https://github.com/hswolff" title="GitHub">
            <img src="/images/external-networks/github.png" alt="github" />
          </a>
        </div>
      </div>
    );
  }
});
