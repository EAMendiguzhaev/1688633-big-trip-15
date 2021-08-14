import { TYPES_OFFERS } from './common/const.js';
import { formatDateForEditPoint } from './utils/point.js';
import AbstractView from './abstract.js';

const BLANK_POINT = {
  type: '',
  destination: '',
  dateFrom: '',
  dateUntil: '',
  price: '',
  description: '',
  offers: [],
};

const createEditPointTemplate = (point = {}) => {
  const { type, destination, dateFrom, dateUntil, price, offers } = point;

  const checkedType = type;

  const renderTypeElements = () =>
    TYPES_OFFERS.map(
      (currentValue) => `
      <div class="event__type-item">
        <input id="event-type-${currentValue.toLowerCase()}-1"
               class="event__type-input visually-hidden"
               type="radio"
               name="event-type"
               value="${currentValue.toLowerCase()}"
               ${currentValue === checkedType ? 'checked' : ''}>
        <label class="event__type-label event__type-label--${currentValue.toLowerCase()}"
               for="event-type-${currentValue.toLowerCase()}-1">
               ${currentValue}
        </label>
      </div>
    `,
    ).join('');

  const generateOffersElement = () =>
    offers
      .map((currentValue) => {
        if (currentValue.title === '') {
          return '';
        }

        return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="event-offer-luggage-${currentValue.price}" type="checkbox" name="event-offer-luggage"
        ${currentValue.title === 'Add meal' ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-${currentValue.price}">
          <span class="event__offer-title">${currentValue.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${currentValue.price}</span>
        </label>
      </div>`;
      })
      .join('');

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${checkedType.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${renderTypeElements()}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${checkedType}
          </label>
          <input class="event__input  event__input--destination"
                 id="event-destination-1"
                 type="text" name="event-destination"
                 value=${destination.name} list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
          value="${formatDateForEditPoint(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
          value="${formatDateForEditPoint(dateUntil)}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${generateOffersElement()}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destination.photos.map((currentValue) => `<img class="event__photo" src="${currentValue.src}" alt="${currentValue.destination}">`).join('')}
            </div>
        </section>
      </section>
    </form>
  </li>
  `;
};

class EditPoint extends AbstractView {
  constructor(point = BLANK_POINT) {
    super();
    this._point = point;

    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createEditPointTemplate(this._point);
  }

  _formCloseHandler() {
    this._callback.formClose();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._point);
  }

  setFormCloseHandler(callback) {
    this._callback.formClose = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formCloseHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }
}

export default EditPoint;
