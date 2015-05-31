'use strict';

const { Store } = require('flummox');

class SocialStore extends Store {
  constructor() {
    super();

    this.state = {
      blog: [],
      pinboard: []
    };
  }
}

module.exports = SocialStore;
