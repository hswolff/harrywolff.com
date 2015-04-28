'use strict';

var jsdom = require('jsdom');

function toArray(list) {
  return Array.prototype.slice.apply(list);
}

/**
 * Formats raw array of post DOMNodes into a usable JavaScript object.
 * @param {Array.<Element>} rawPosts Array of raw dom nodes.
 * @return {Array.<Object>}
 */
function formatPosts(rawPosts) {
  return rawPosts.map(function(postNode) {
    var postTitleEl = postNode.querySelector('h2 > a');

    return {
      title: postTitleEl.textContent,
      url: postTitleEl.href,
      excerpt: postNode.querySelector('.post-excerpt > p').textContent.replace(' »', ''),
      date: (new Date(postNode.querySelector('time').textContent)).getTime(),
      tags: toArray(postNode.querySelectorAll('footer > span > a')).map(function(tagNode) {
        return {
          title: tagNode.textContent,
          url: tagNode.href
        };
      })
    };
  });
}

/**
 * Gets the most recent posts from blog.
 * @return {Promise} Promise object with array of posts.
 */
module.exports = function() {
  return new Promise((resolve, reject) => {
    jsdom.env({
      url: 'http://blog.hswolff.com/',
      done: function(errors, window) {
        if (errors) {
          reject(errors);
        } else {
          var posts = formatPosts(
            toArray(window.document.querySelectorAll('article.post'))
          );
          resolve(posts);
        }
      }
    });
  });
};
