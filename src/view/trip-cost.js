import AbstractView from './abstract.js';

export const createTripCostTemplate = (points) => {
  const totalCost = points.reduce((acc, it) => (acc += it.price), 0);

  return `<p class="trip-info__cost">
             Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
          </p>`;
};

class TripCost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}

export default TripCost;
