window.jQuery = window.$ = require('../../bower_components/jquery/dist/jquery.js');
require('./twitter-tooltip');

$('#external-networks a').tooltip({
  placement: 'bottom',
  title: 'bob'
});
