import { createNode } from './utils.js';

const createTripTabsTemplate = () => `
<nav class="trip-controls__trip-tabs trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>`;

class TripTabs {
  constructor() {
    this._node = null;
  }

  getTemplate() {
    return createTripTabsTemplate();
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

export default TripTabs;
