import { generatePoint } from './view/mocks/point.js';
import { MenuItem } from './view/common/const.js';
import { RenderPosition, render, remove } from './view/utils/render.js';
import TripPresenter from './view/presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './view/presenter/filter.js';
import TripTabsView from './view/trip-tabs.js';
import StatisticsView from './view/statistics.js';

const POINTS_COUNT = 14;

const tripMainElement = document.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
const newPointButton = tripMainElement.querySelector('.trip-main__event-add-btn');
const siteMenuElement = tripMainElement.querySelector('.trip-controls__navigation');
const pageMainContainerElement = pageMainElement.querySelector('.page-body__container');

const filterModel = new FilterModel();

const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const siteMenuComponent = new TripTabsView();
render(siteMenuElement, siteMenuComponent, RenderPosition.AFTERBEGIN);

let statisticsComponent = null;

const filterPresenter = new FilterPresenter(filtersElement, filterModel);
const tripPresenter = new TripPresenter(tripMainElement, pageMainElement, pointsModel, filterModel);

const handleSiteMenuClick = (menuItem) => {
  if (siteMenuElement.querySelector(`[data-type="${menuItem}"]`).classList.contains('trip-tabs__btn--active')) {
    return;
  }

  siteMenuComponent.setMenuItem(menuItem);

  switch (menuItem) {
    case MenuItem.TABLE: {
      tripPresenter.showEventsTable();
      newPointButton.disabled = false;

      remove(statisticsComponent);
      break;
    }

    case MenuItem.STATS: {
      tripPresenter.hideEventsTable();
      newPointButton.disbled = true;

      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(pageMainContainerElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
    }
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

newPointButton.addEventListener('click', () => {
  tripPresenter.createPoint();

  newPointButton.disabled = true;
});
