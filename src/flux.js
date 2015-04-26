'use strict';

const { Flummox } = require('flummox');

class Flux extends Flummox {
  constructor(initialData) {
    super();

    this.createStore('blog', require('./stores/blog'), this);
    this.createStore('pinboard', require('./stores/pinboard'), this);

    for (let key in initialData) {
      this.getStore(key).setState({
        items: initialData[key]
      });
    }
  }
}

exports.Flux = Flux;
