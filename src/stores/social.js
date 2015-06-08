import { Store } from 'flummox';

export default class SocialStore extends Store {
  constructor() {
    super();

    this.state = {
      blog: [],
      pinboard: []
    };
  }
}
