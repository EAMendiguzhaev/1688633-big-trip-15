const DAY_PASS = 7;
const HOURS_PASS = 24;
const MINUTES_PASS = 60;

const TYPES_OFFERS = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const OfferSetting = {
  min: 1,
  max: 5,
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const DEFAULT_TIME_DIFFERENCE = 1;

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export { DAY_PASS, HOURS_PASS, MINUTES_PASS, TYPES_OFFERS, OfferSetting, SortType, DEFAULT_TIME_DIFFERENCE, UserAction, UpdateType, FilterType, MenuItem };
