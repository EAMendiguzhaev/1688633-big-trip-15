import TripInfoContainerView from '../trip-info-containter.js';
import TripInfoView from '../trip-info.js';
import TripCostView from '../trip-cost.js';
import { RenderPosition, render, remove } from '../utils/render.js';

class TripInformation {
  constructor(tripMain) {
    this._tripMain = tripMain;

    this._tripInformationContainerComponent = null;
    this._tripInformationComponent = null;
    this._tripCostComponent = null;
  }

  init(points) {
    this._tripInformationContainerComponent = new TripInfoContainerView();

    this._renderTripInformationContainer();

    this._tripInformationElement = this._tripMain.querySelector('.trip-info');

    this._renderAllInfo(points);
  }

  destroy() {
    remove(this._tripInformationContainerComponent);
    remove(this._tripInformationComponent);
    remove(this._tripCostComponent);
  }

  _renderTripInformationContainer() {
    render(this._tripMain, this._tripInformationContainerComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripInformation(points) {
    this._tripInformationComponent = new TripInfoView(points);
    render(this._tripInformationElement, this._tripInformationComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripCost(points) {
    this._tripCostComponent = new TripCostView(points);
    render(this._tripInformationElement, this._tripCostComponent, RenderPosition.BEFOREEND);
  }

  _renderAllInfo(points) {
    this._renderTripInformation(points);
    this._renderTripCost(points);
  }
}

export default TripInformation;
