import { createNode } from './utils.js';

const createTripFiltersTemplate = () => `
<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-fvalue="everything" checked>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-fvalue="future">
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-fvalue="past">
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>
`;

class TripFilters {
  constructor() {
    this._node = null;
  }

  getTemplate() {
    return createTripFiltersTemplate();
  }

  getNode() {
    if (!this._node) {
      this._node = createNode(this.getTemplate());
    }

    return this._node;
  }

  removeNode() {
    this._node = null;
  }
}

export default TripFilters;
