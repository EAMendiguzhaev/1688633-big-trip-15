import { RenderPosition, render } from './view/utils.js';
import TripMainView from './view/trip-main.js';
import TripTabsView from './view/trip-tabs.js';
// import TripFiltersView from './view/trip-filters.js';
// import TripSortView from './view/trip-sort.js';
// import TripEventListView from './view/trip-event-list.js';
// import EditPointView from './view/edit-point.js';
// import ContentView from './view/content.js';
import { generateEvent } from './view/mocks/event.js';

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => a.dateUntil > b.dateUntil);

const pageHeader = document.querySelector('.page-header');
const menuControlsNode = pageHeader.querySelector('.trip-controls__navigation');
const tripMainNode = pageHeader.querySelector('.trip-main');
// const filterConrolsNode = tripMainNode.querySelector('.trip-controls__filters');
// const eventsContainerNode = document.querySelector('.trip-events');

// Маршрут городов, время и общая стоимость поездки
render(tripMainNode, new TripMainView(events).getNode(), RenderPosition.AFTERBEGIN);

// Меню
render(menuControlsNode, new TripTabsView().getNode(), RenderPosition.BEFOREEND);

// Фильтры everything, future, past
// render(filterConrolsNode, createTripFiltersTemplate(), 'afterbegin');

// Сортировка day, event, time, price, offers
// render(eventsContainerNode, createTripSortTemplate(), 'afterbegin');

// Контент
// render(eventsContainerNode, createTripEventListTemplate(), 'beforeend');

// const tripEventListNode = eventsContainerNode.querySelector('.trip-events__list');

// render(tripEventListNode, new EditPointView(events[0]).getNode(), 'afterbegin');

// for (let i = 1; i < EVENTS_COUNT; i++) {
//   render(tripEventListNode, createContentNode(events[i]), 'beforeend');
// }
