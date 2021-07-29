import { renderTemplate } from './view/util.js';
import { createSiteMenuTemplate } from './view/controls-navigation.js';
import { createFiltersTemplate } from './view/controls-filters.js';
import { createRouteAndCoastTemplate } from './view/trip-main.js';
import { createFormSortTemplate } from './view/sort-form.js';
import { createContentNode } from './view/content.js';
import { createEditFormNode } from './view/edit-form.js';

const COUNT_TRIPS = 3;

const tripMainNode = document.querySelector('.trip-main');
const menuControlsNode = tripMainNode.querySelector('.trip-controls__navigation');
const filterConrolsNode = tripMainNode.querySelector('.trip-controls__filters');
const eventsContainerNode = document.querySelector('.trip-events');

renderTemplate(tripMainNode, createRouteAndCoastTemplate(), 'afterbegin');
renderTemplate(menuControlsNode, createSiteMenuTemplate(), 'afterbegin');
renderTemplate(filterConrolsNode, createFiltersTemplate(), 'afterbegin');
renderTemplate(eventsContainerNode, createFormSortTemplate(), 'afterbegin');
renderTemplate(eventsContainerNode, createEditFormNode(), 'beforeend');

for (let i = 0; i < COUNT_TRIPS; i++) {
  renderTemplate(eventsContainerNode, createContentNode(), 'beforeend');
}
