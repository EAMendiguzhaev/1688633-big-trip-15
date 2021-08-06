import { createNode } from './utils.js';

const createTripEventListTemplate = () => `<ul class="trip-events__list">
                                           </ul>`;

export default class TripEventList {
  constructor() {
    this._node = null;
  }

  getTemplate() {
    return createTripEventListTemplate();
  }

  getNode() {
    if (!this._node) {
      this._node = createNode(this.getTemplate());
    }

    return this._node;
  }

  removeNode() {
    return (this._node = null);
  }
}
