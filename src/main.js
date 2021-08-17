import { render, RenderPosition } from './view/utils/render.js';
import { generateEvent } from './view/mocks/event.js';
import TripMainView from './view/trip-main.js';
import TripTabsView from './view/trip-tabs.js';
import TripFiltersView from './view/trip-filters.js';
import TripPresenter from './view/presenter/trip.js';

const EVENTS_COUNT = 20;

const pageHeader = document.querySelector('.page-header');
const menuControlsElement = pageHeader.querySelector('.trip-controls__navigation');
const tripMainElement = pageHeader.querySelector('.trip-main');
const filterConrolsElement = tripMainElement.querySelector('.trip-controls__filters');
const eventContainerElement = document.querySelector('.trip-events');

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

render(menuControlsElement, new TripTabsView(), RenderPosition.BEFOREEND);
render(filterConrolsElement, new TripFiltersView(), RenderPosition.AFTERBEGIN);

if (events.length > 0) {
  render(tripMainElement, new TripMainView(events), RenderPosition.AFTERBEGIN);
}

const tripPresenter = new TripPresenter(eventContainerElement);

tripPresenter.init(events);
