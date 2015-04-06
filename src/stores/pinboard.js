'use strict';

const Reflux = require('reflux');

module.exports = Reflux.createStore({
  init() {
    this.items = [];
  },

  bootstrap(initValues) {
    this.items = initValues;
  },

  getData() {
    return this.items;
  }
});
