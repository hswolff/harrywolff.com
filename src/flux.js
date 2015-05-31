'use strict';

const { Flummox } = require('flummox');

class Flux extends Flummox {
  constructor(initialData) {
    super();

    this.createStore('social', require('./stores/social'), this);

    for (let key in initialData) {
      this.getStore('social').setState({
        [key]: initialData[key].slice(0, 10)
      });
    }
  }
}

exports.Flux = Flux;
