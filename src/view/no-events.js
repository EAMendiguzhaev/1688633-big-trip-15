import { createNode } from './utils.js';

const createNoEventsTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

class NoEvents {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoEventsTemplate();
  }

  getNode() {
    if (!this._element) {
      this._element = createNode(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default NoEvents;
