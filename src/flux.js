import Flummox from 'flummox';

import SocialStore from './stores/social';

export default class Flux extends Flummox {
  constructor(initialData) {
    super();

    this.createStore('social', SocialStore, this);

    if (initialData) {
      this.bootstrap(initialData);
    }
  }

  bootstrap(data) {
    for (let key in data) {
      this.getStore('social').setState({
        // Only use first 10 for now.
        [key]: data[key].slice(0, 10)
      });
    }
  }
}
