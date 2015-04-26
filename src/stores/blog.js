'use strict';

const { Store } = require('flummox');

class Blog extends Store {
  constructor() {
    super();

    this.state = {
      items: []
    };
  }
}

module.exports = Blog;
