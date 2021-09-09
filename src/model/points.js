import Observer from '../view/utils/observer.js';

class Points extends Observer {
  constructor() {
    super();

    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Unable to update an existing point');
    }

    this._points = [...this._points.slice(0, index), update, ...this._points.slice(index + 1)];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [update, ...this._points];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Unable to delete existing point');
    }

    this._points = [...this._points.slice(0, index), ...this._points.slice(index + 1)];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign({}, point, {
      id: point.id,
      type: point.type,
      destination: point.destination,
      offers: point.offers,
      dateFrom: point.date_from !== null ? new Date(point.date_from) : point.date_from,
      dateUntil: point.date_to !== null ? new Date(point.date_to) : point.date_to,
      price: point.base_price,
      isFavorite: point.is_favorite,
    });

    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign({}, point, {
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': point.dateUntil instanceof Date ? point.dateUntil.toISOString() : null,
      'base_price': point.price,
      'is_favorite': point.isFavorite,
      'offers': point.offers,
    });

    delete adaptedPoint.data;

    return adaptedPoint;
  }
}

export default Points;
