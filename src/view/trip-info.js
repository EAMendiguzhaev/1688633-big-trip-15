import { getTotalDate } from './utils/point.js';
import AbstractView from './abstract.js';

const POINTS_COUNT = 3;

const getTotalRoute = (points) => {
  if (points.length > POINTS_COUNT) {
    return `${points[0].destination.name} - ... - ${points[points.length - 1].destination.name}`;
  }

  const trips = [];

  points.forEach((currentValue) => {
    trips.push(currentValue.destination.name);
  });

  return trips.join('-');
};

const createTripInformationTemplate = (points) => {
  const totalDate = getTotalDate(points[0].dateFrom, points[points.length - 1].dateUntil);
  const totalRoute = getTotalRoute(points);

  return `<div class="trip-info__main">
      <h1 class="trip-info__title">${totalRoute}</h1>
      <p class="trip-info__dates">${totalDate}</p>
    </div>`;
};

class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInformationTemplate(this._points);
  }
}

export default TripInfo;
