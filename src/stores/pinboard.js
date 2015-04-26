'use strict';

const { Store } = require('flummox');

class Pinboard extends Store {
  constructor() {
    super();

    this.state = {
      items: []
    };
  }
}

module.exports = Pinboard;
