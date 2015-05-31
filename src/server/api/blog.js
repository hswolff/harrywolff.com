'use strict';

var fetch = require('node-fetch');
var striptags = require('striptags');
var he = require('he');

/**
 * Gets the most recent posts from blog.
 * @return {Promise} Promise object with array of posts.
 */
module.exports = function() {
  return fetch('http://blog.hswolff.com/json/posts.json')
    .then(res => res.json())
    .then(json => {
      return json.result.map(item => {
        return {
          title: item.title,
          url: `http://blog.hswolff.com/${item.slug}/`,
          excerpt: he.decode(striptags(item.excerpt)),
          date: (new Date(item.date)).getTime(),
          tags: item.tags.map(function(tag) {
            return {
              title: tag,
              url: `http://blog.hswolff.com/tag/${tag}/`
            };
          })
        };
      });
    });
};
