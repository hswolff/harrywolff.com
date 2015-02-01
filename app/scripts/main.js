window.jQuery = window.$ = require('jquery');
require('./twitter-tooltip');

$('#external-networks a').tooltip({
  placement: 'bottom',
  title: 'bob'
});
