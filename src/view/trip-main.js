import { createNode, getTotalDate } from './utils.js';

const EVENTS_COUNT = 3;

const getTotalRoute = (events) => {
  if (events.length > EVENTS_COUNT) {
    return `${events[0].destination.name} - ... - ${events[events.length - 1].destination.name}`;
  } else {
    const trips = [];

    events.forEach((currentValue) => {
      trips.push(currentValue.destination.name);
    });

    return trips.join(' - ');
  }
};

const createTripMainTemplate = (events) => {
  let totalCost = 0;

  const totalDate = getTotalDate(events[0].dateFrom, events[events.length - 1].dateUntil);
  const totalRoute = getTotalRoute(events);

  events.forEach((value) => {
    totalCost += value.price;
  });

  return `
  <section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${totalRoute}</h1>
      <p class="trip-info__dates">${totalDate}</p>
    </div>
    <p class="trip-info__cost">
       Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>
  </section>
  `;
};

export default class TripMain {
  constructor(events) {
    this._node = null;
    this._events = events;
  }

  getTemplate() {
    return createTripMainTemplate(this._events);
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
