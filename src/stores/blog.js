'use strict';

const Reflux = require('reflux');

module.exports = Reflux.createStore({
  init() {
    this.posts = [];
  },

  bootstrap(initValues) {
    this.posts = initValues;
  },

  getData() {
    return this.posts;
  }
});
