import { renderTemplate } from './view/utils.js';
import { createTripMainTemplate } from './view/trip-main.js';
import { createTripTabsTemplate } from './view/trip-tabs.js';
import { createTripFiltersTemplate } from './view/trip-filters.js';
import { createTripSortTemplate } from './view/trip-sort.js';
import { createTripEventListTemplate } from './view/trip-event-list.js';
import { createEditPointTemplate } from './view/edit-point.js';
import { createContentNode } from './view/content.js';
import { generateEvent } from './view/mocks/event.js';

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => {
    if (a.dateUntil > b.dateUntil) {
      return 1;
    }
    if (a.dateUntil < b.dateUntil) {
      return -1;
    }
    return 0;
  });

const pageHeader = document.querySelector('.page-header');
const menuControlsNode = pageHeader.querySelector('.trip-controls__navigation');
const tripMainNode = pageHeader.querySelector('.trip-main');
const filterConrolsNode = tripMainNode.querySelector('.trip-controls__filters');
const eventsContainerNode = document.querySelector('.trip-events');

// Меню
renderTemplate(menuControlsNode, createTripTabsTemplate(), 'afterbegin');

// Маршрут городов, время и общая стоимость поездки
renderTemplate(tripMainNode, createTripMainTemplate(events), 'afterbegin');

// Фильтры everything, future, past
renderTemplate(filterConrolsNode, createTripFiltersTemplate(), 'afterbegin');

// Сортировка day, event, time, price, offers
renderTemplate(eventsContainerNode, createTripSortTemplate(), 'afterbegin');

// Контент
renderTemplate(eventsContainerNode, createTripEventListTemplate(), 'beforeend');

const tripEventListNode = eventsContainerNode.querySelector('.trip-events__list');

renderTemplate(tripEventListNode, createEditPointTemplate(events[0]), 'afterbegin');

for (let i = 1; i < EVENTS_COUNT; i++) {
  renderTemplate(tripEventListNode, createContentNode(events[i]), 'beforeend');
}
