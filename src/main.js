import { RenderPosition, render } from './view/utils.js';
import NoEventsView from './view/no-events.js';
import TripMainView from './view/trip-main.js';
import TripTabsView from './view/trip-tabs.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripEventListView from './view/trip-event-list.js';
import EditPointView from './view/edit-point.js';
import ContentView from './view/content.js';
import { generateEvent } from './view/mocks/event.js';

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => a.dateUntil > b.dateUntil);

const pageHeader = document.querySelector('.page-header');
const menuControlsNode = pageHeader.querySelector('.trip-controls__navigation');
const tripMainNode = pageHeader.querySelector('.trip-main');
const filterConrolsNode = tripMainNode.querySelector('.trip-controls__filters');
const eventsContainerNode = document.querySelector('.trip-events');

if (events.length === 0) {
  render(eventsContainerNode, new NoEventsView().getNode(), RenderPosition.BEFOREEND);
} else {
  // Маршрут городов, время и общая стоимость поездки
  render(tripMainNode, new TripMainView(events).getNode(), RenderPosition.AFTERBEGIN);

  // Сортировка day, event, time, price, offers
  render(eventsContainerNode, new TripSortView().getNode(), RenderPosition.AFTERBEGIN);
}

// Меню
render(menuControlsNode, new TripTabsView().getNode(), RenderPosition.BEFOREEND);

// Фильтры everything, future, past
render(filterConrolsNode, new TripFiltersView().getNode(), RenderPosition.AFTERBEGIN);

// Контент
render(eventsContainerNode, new TripEventListView().getNode(), RenderPosition.BEFOREEND);

const tripEventListNode = eventsContainerNode.querySelector('.trip-events__list');

const renderEvents = (eventsListNode, event) => {
  const editEventComponent = new EditPointView(event);
  const contentComponent = new ContentView(event);

  const replaceEventToEditForm = () => {
    eventsListNode.replaceChild(editEventComponent.getNode(), contentComponent.getNode());
  };

  const replaceEditFormToEvent = () => {
    eventsListNode.replaceChild(contentComponent.getNode(), editEventComponent.getNode());
  };

  const onEscKeyDawn = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditFormToEvent();
      document.removeEventListener('keydown', onEscKeyDawn);
    }
  };

  contentComponent
    .getNode()
    .querySelector('.event__rollup-btn')
    .addEventListener('click', () => {
      replaceEventToEditForm();

      document.addEventListener('keydown', onEscKeyDawn);
      editEventComponent
        .getNode()
        .querySelector('.event__rollup-btn')
        .addEventListener('click', () => {
          replaceEditFormToEvent();
        });
    });

  editEventComponent
    .getNode()
    .querySelector('form')
    .addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToEvent();

      document.removeEventListener('click', onEscKeyDawn);
    });

  render(eventsListNode, contentComponent.getNode(), RenderPosition.BEFOREEND);
};

for (let i = 1; i < EVENTS_COUNT; i++) {
  renderEvents(tripEventListNode, events[i]);
}
