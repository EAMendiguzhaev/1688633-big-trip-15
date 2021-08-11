import AbstractView from './abstract.js';

const createTripEventListTemplate = () => `<ul class="trip-events__list">
                                           </ul>`;

class TripEventList extends AbstractView {
  getTemplate() {
    return createTripEventListTemplate();
  }
}

export default TripEventList;
