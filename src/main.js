import { render, RenderPosition, replace } from './view/utils/render.js';
import NoEventsView from './view/no-events.js';
import TripMainView from './view/trip-main.js';
import TripTabsView from './view/trip-tabs.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripEventListView from './view/trip-event-list.js';
import EditPointView from './view/edit-point.js';
import ContentView from './view/content.js';
import { generateEvent } from './view/mocks/event.js';
import { KeyboardKey } from './view/common/enums.js';

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => a.dateUntil > b.dateUntil);

const pageHeader = document.querySelector('.page-header');
const menuControlsElement = pageHeader.querySelector('.trip-controls__navigation');
const tripMainElement = pageHeader.querySelector('.trip-main');
const filterConrolsElement = tripMainElement.querySelector('.trip-controls__filters');
const eventsContainerElement = document.querySelector('.trip-events');

if (events.length === 0) {
  render(eventsContainerElement, new NoEventsView(), RenderPosition.BEFOREEND);
} else {
  // Маршрут городов, время и общая стоимость поездки
  render(tripMainElement, new TripMainView(events), RenderPosition.AFTERBEGIN);

  // Сортировка day, event, time, price, offers
  render(eventsContainerElement, new TripSortView(), RenderPosition.AFTERBEGIN);
}

// Меню
render(menuControlsElement, new TripTabsView(), RenderPosition.BEFOREEND);

// Фильтры everything, future, past
render(filterConrolsElement, new TripFiltersView(), RenderPosition.AFTERBEGIN);

// Контент
render(eventsContainerElement, new TripEventListView(), RenderPosition.BEFOREEND);

const tripEventListElement = eventsContainerElement.querySelector('.trip-events__list');

const renderEvents = (eventsListElement, event) => {
  const editEventComponent = new EditPointView(event);
  const contentComponent = new ContentView(event);

  const replaceEventToEditForm = () => {
    replace(editEventComponent, contentComponent);
  };

  const replaceEditFormToEvent = () => {
    replace(contentComponent, editEventComponent);
  };

  const onEscKeyDawn = (evt) => {
    if (evt.key === KeyboardKey.ESCAPE) {
      evt.preventDefault();
      replaceEditFormToEvent();
      document.removeEventListener('keydown', onEscKeyDawn);
    }
  };

  contentComponent.setPointOpenHandler(() => {
    replaceEventToEditForm();

    document.addEventListener('keydown', onEscKeyDawn);
  });

  editEventComponent.setFormCloseHandler(() => {
    replaceEditFormToEvent();
  });

  editEventComponent.setFormSubmitHandler(() => {
    replaceEditFormToEvent();

    document.removeEventListener('click', onEscKeyDawn);
  });

  render(eventsListElement, contentComponent, RenderPosition.BEFOREEND);
};

for (let i = 1; i < EVENTS_COUNT; i++) {
  renderEvents(tripEventListElement, events[i]);
}
