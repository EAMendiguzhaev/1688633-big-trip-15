const DAY_PASS = 7;
const HOURS_PASS = 24;
const MINUTES_PASS = 60;

const TYPES_OFFERS = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITIES = ['Saint-Petersburg', 'New-York', 'San-Francisco', 'Tokyo', 'Sydney', 'London', 'Paris', 'Switzerland'];

const DESCRIPTION_CITY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const OfferSetting = {
  min: 1,
  max: 5,
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const OFFERS = [
  {
    type: 'Taxi',
    offers: [
      { title: 'Upgrade to a business class', price: 120 },
      { title: 'Choose the radio station', price: 60 },
    ],
  },
  {
    type: 'Bus',
    offers: [{ title: 'Switch to comfort', price: 80 }],
  },
  {
    type: 'Train',
    offers: [
      { title: 'Wi-Fi', price: 10 },
      { title: 'Add meal', price: 50 },
      { title: 'Switch to comfort', price: 80 },
      { title: 'Upgrade to a business class', price: 120 },
    ],
  },
  {
    type: 'Ship',
    offers: [
      { title: 'Add meal', price: 50 },
      { title: 'Switch to comfort', price: 80 },
      { title: 'Upgrade to comfort', price: 120 },
      { title: 'Add luggage', price: 100 },
    ],
  },
  {
    type: 'Transport',
    offers: [
      { title: 'Wi-Fi', price: 10 },
      { title: 'Add meal', price: 50 },
    ],
  },
  {
    type: 'Drive',
    offers: [
      { title: 'Add insurance', price: 100 },
      { title: 'Upgrade car', price: 120 },
    ],
  },
  {
    type: 'Flight',
    offers: [
      { title: 'Choose seats', price: 10 },
      { title: 'Add meal', price: 15 },
      { title: 'Add luggage', price: 100 },
      { title: 'Upgrade to a business class', price: 120 },
    ],
  },
  {
    type: 'Check-in',
    offers: [],
  },
  {
    type: 'Sightseeing',
    offers: [{ title: 'Add meal', price: 15 }],
  },
  {
    type: 'Restaurant',
    offers: [],
  },
];

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

export {
  DAY_PASS,
  HOURS_PASS,
  MINUTES_PASS,
  TYPES_OFFERS,
  CITIES,
  DESCRIPTION_CITY,
  OfferSetting,
  SortType,
  OFFERS,
  DEFAULT_TIME_DIFFERENCE,
  UserAction,
  UpdateType,
  FilterType,
  MenuItem,
};
