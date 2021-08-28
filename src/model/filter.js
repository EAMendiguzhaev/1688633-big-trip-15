import Observer from '../view/utils/observer.js';

import { FilterType } from '../view/common/const.js';

class Filter extends Observer {
  constructor() {
    super();

    this._currentFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._currentFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._currentFilter;
  }
}

export default Filter;
