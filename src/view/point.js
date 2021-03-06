import dayjs from 'dayjs';
import { getTimeDifference } from './utils/point.js';
import AbstractView from './abstract.js';

const createContentElement = (point) => {
  const { type, destination, dateFrom, dateUntil, isFavorite, price } = point;
  const date = dayjs(dateFrom).format('MMM D');
  const timeFrom = dayjs(dateFrom).format('HH:mm');
  const timeUntil = dayjs(dateUntil).format('HH:mm');
  const timeDifference = getTimeDifference(dateFrom, dateUntil);
  const typeLowerCase = type.toLowerCase();
  const favoriteClassName = isFavorite ? 'event__favorite-btn event__favorite-btn--active' : 'event__favorite-btn';

  const generateOffersElement = () =>
    point.offers
      .map((value) => {
        if (value.title === '') {
          return '';
        }

        return `
      <li class="event__offer">
        <span class="event__offer-title">${value.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${value.price}</span>
      </li>`;
      })
      .join('');

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${typeLowerCase}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type}${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${timeFrom}</time>
          &mdash;
         <time class="event__end-time" datetime="${dateUntil}">${timeUntil}</time>
        </p>
        <p class="event__duration">${timeDifference}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${generateOffersElement()}
      </ul>
      <button class="${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._pointOpenHandler = this._pointOpenHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createContentElement(this._point);
  }

  _pointOpenHandler() {
    this._callback.pointOpen();
  }

  setPointOpenHandler(callback) {
    this._callback.pointOpen = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointOpenHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}

export default Point;
