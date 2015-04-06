'use strict';

var fetch = require('node-fetch');

/**
 * Fetches Pinboard data.
 * @return {Promise} Promise object with array of posts.
 */
module.exports = function() {
  return fetch('http://feeds.pinboard.in/json/u:hswolff/?count=20')
    .then(res => res.json())
    .then(json => {
      return json.map(item => {
        return {
          url: item.u,
          title: item.d,
          date: new Date(item.dt),
          tags: item.t
        };
      });
    });
};
