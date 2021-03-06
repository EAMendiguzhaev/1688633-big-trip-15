import dayjs from 'dayjs';
import he from 'he';
import { TYPES_OFFERS, DEFAULT_TIME_DIFFERENCE } from './common/const.js';
import { formatDateForEditPoint } from './utils/point.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createDestinationDatalistTemplate = (destinations) => {
  let optionsMarkup = '';

  destinations.forEach((currentValue) => {
    optionsMarkup += `<option value="${currentValue.name}"></option>`;
  });

  return optionsMarkup;
};

const createOptionOffersTemplate = (allOffersOfCurrentType, checkedOffers, isDisabled) => {
  const allOffers = allOffersOfCurrentType.offers;

  if (!allOffers.length) {
    return '';
  }

  let optionsMarkup = '';

  allOffers.forEach((offer, index) => {
    const isChecked = checkedOffers.find((checkedOffer) => checkedOffer.title === offer.title);

    const id = `event-offer-${offer.title.toLowerCase().split(' ').join('-')}-${index + 1}`;

    optionsMarkup += `<div class="event__offer-selector">
    <input class="event__offer-checkbox visually-hidden" id="${id}" type="checkbox" value="${offer.title}" name="${id}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="event__offer-label" for="${id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  });

  return `<section class="event__section event__section--offers">
            <h3 class="event__section-title event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${optionsMarkup}
            </div>
          </section>`;
};

const createEventTypeItemsTemplate = (chosenType, types, isDisabled) => {
  let itemsMarkup = '';

  types.forEach((currentType) => {
    itemsMarkup += `<div class="event__type-item">
      <input id="event-type-${currentType.toLowerCase()}" class="event__type-input visually-hidden" type="radio" name="event-type" ${isDisabled ? 'disabled' : ''} value="${currentType.toLowerCase()}"
      ${currentType.toLowerCase() === chosenType ? 'checked' : ''}>
      <label class="event__type-label event__type-label--${currentType.toLowerCase()}" for="event-type-${currentType.toLowerCase()}">${currentType}</label>
    </div>`;
  });

  return itemsMarkup;
};

const createPicturesTemplate = (pictures) => {
  let picturesMarkup = '';

  pictures.forEach((picture) => {
    picturesMarkup += `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  });

  return picturesMarkup;
};

const createEditPointTemplate = (point, offersData, destinationsData, isDisabled) => {
  const { type, destination, dateFrom, dateUntil, price, isSaving, isDeleting } = point;

  const checkedOffers = point.offers;
  const destinations = destinationsData;
  const allOffersOfCurrentType = offersData.find((item) => item.type === type);

  return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
               ${createEventTypeItemsTemplate(type, TYPES_OFFERS, isDisabled)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input event__input--destination"
              id="event-destination-1"
              type="text" name="event-destination"
              value="${he.encode(destination.name)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${createDestinationDatalistTemplate(destinations)}
            </datalist>
          </div>
          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time"
              value="${formatDateForEditPoint(dateFrom)}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
              value="${formatDateForEditPoint(dateUntil)}" ${isDisabled ? 'disabled' : ''}>
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
              <input class="event__input event__input--price" id="event-price-1" type="number" name="event-price" value="${price}"
              ${isDisabled ? 'disabled' : ''}>
          </div>
          <button class="event__save-btn btn btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
          <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${createOptionOffersTemplate(allOffersOfCurrentType, checkedOffers)}
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${createPicturesTemplate(destination.pictures)}
              </div>
            </div>
          </section>
        </section>
    </form>
  </li>`;
};

class EditPoint extends SmartView {
  constructor(point, allOffers, allDestinations) {
    super();
    this._data = EditPoint.parsePointToData(point);

    this._datepickerFrom = null;
    this._datepickerUntil = null;

    this._destinations = allDestinations;
    this._offers = allOffers;

    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._pointTypeToggleHandler = this._pointTypeToggleHandler.bind(this);
    this._pointCityToggleHandler = this._pointCityToggleHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateUntilChangeHandler = this._dateUntilChangeHandler.bind(this);
    this._deletePointClickHandler = this._deletePointClickHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setFromDatepicker();
    this._setToDatepicker();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.formClose);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this._setFromDatepicker();
    this._setToDatepicker();
  }

  reset(point) {
    this.updateData(EditPoint.parsePointToData(point));
  }

  _setFromDatepicker() {
    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }

    this._datepickerFrom = flatpickr(this.getElement().querySelector('#event-start-time-1'), {
      'enableTime': true,
      'time_24hr': true,
      'dateFormat': 'd/m/y H:i',
      'defaultDate': dayjs(this._data.dateFrom).toDate(),
      onChange: this._dateFromChangeHandler,
    });
  }

  _setToDatepicker() {
    if (this._datepickerUntil) {
      this._datepickerUntil.destroy();
      this._datepickerUntil = null;
    }

    this._datepickerUntil = flatpickr(this.getElement().querySelector('#event-end-time-1'), {
      'enableTime': true,
      'time_24hr': true,
      'minDate': dayjs(this._data.dateFrom).toDate(),
      'dateFormat': 'd/m/y H:i',
      'defaultDate': dayjs(this._data.dateUntil).toDate(),
      onChange: this._dateUntilChangeHandler,
    });
  }

  _dateFromChangeHandler([userDate]) {
    const isFromAfterUntil = userDate > this._data.dateUntil;

    this.updateData({
      dateFrom: userDate,
      dateUntil: isFromAfterUntil ? dayjs(userDate).add(DEFAULT_TIME_DIFFERENCE, 'hour') : this._data.dateUntil,
    });
  }

  _dateUntilChangeHandler([userDate]) {
    this.updateData({
      dateUntil: userDate,
    });
  }

  _formCloseHandler() {
    this._callback.formClose();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    const newCityName = this.getElement().querySelector('#event-destination-1');

    if (this._getDestinationList(this._destinations).indexOf(newCityName.value) === -1) {
      newCityName.value = '';
      return;
    }

    this._callback.formSubmit(EditPoint.parseDataToPoint(this._data));
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._pointTypeToggleHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._pointCityToggleHandler);
    this.getElement().querySelector('#event-price-1').addEventListener('change', this._priceChangeHandler);

    const offersSectionElement = this.getElement().querySelector('.event__section--offers');

    if (offersSectionElement) {
      offersSectionElement.addEventListener('change', this._offersChangeHandler);
    }
  }

  _offersChangeHandler(evt) {
    if (!evt.target.classList.contains('event__offer-checkbox')) {
      return;
    }

    const selectedOfferName = evt.target.value;
    const justDataUpdating = true;

    const selectedOfferIndex = this._data.offers.findIndex((offer) => offer.title === selectedOfferName);

    if (selectedOfferIndex < 0) {
      const currentOffer = this._offers.find((offers) => offers.type === this._data.type).offers.find((offer) => offer.title === selectedOfferName);

      this.updateData({ offers: [currentOffer, ...this._data.offers] }, justDataUpdating);
    } else {
      this.updateData({ offers: [...this._data.offers.slice(0, selectedOfferIndex), ...this._data.offers.slice(selectedOfferIndex + 1)] }, justDataUpdating);
    }
  }

  setFormCloseHandler(callback) {
    this._callback.formClose = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formCloseHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _priceChangeHandler(evt) {
    const newPrice = evt.currentTarget.valueAsNumber;

    const justDataUpdating = true;

    this.updateData({ price: newPrice }, justDataUpdating);
  }

  getTemplate() {
    return createEditPointTemplate(this._data, this._offers, this._destinations);
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  _pointTypeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: [],
    });
  }

  _getDestinationList(destinations) {
    const destinationList = destinations.map((destination) => destination.name);
    return destinationList;
  }

  _pointCityToggleHandler(evt) {
    const newCityName = evt.currentTarget.value;

    if (newCityName === this._data.destination) {
      return;
    } else if (this._getDestinationList(this._destinations).indexOf(newCityName) === -1) {
      evt.currentTarget.value = '';
      return;
    }

    const destinationItem = this._destinations.find((destination) => destination.name === newCityName);

    if (destinationItem) {
      this.updateData({ destination: destinationItem });
    }
  }

  _deletePointClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditPoint.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deletePointClickHandler);
  }

  static parsePointToData(point) {
    const data = Object.assign({}, point, {
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });

    return data;
  }

  static parseDataToPoint(data) {
    const point = Object.assign({}, data);

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}

export default EditPoint;
