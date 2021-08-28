import AbstractView from './abstract.js';

const createTripInfoContainerTemplate = () => `<section class="trip-main__trip-info trip-info">
                                               </section>`;

class TripInfoContainer extends AbstractView {
  getTemplate() {
    return createTripInfoContainerTemplate();
  }
}

export default TripInfoContainer;
