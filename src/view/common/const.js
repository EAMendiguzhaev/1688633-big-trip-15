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
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export { DAY_PASS, HOURS_PASS, MINUTES_PASS, TYPES_OFFERS, CITIES, DESCRIPTION_CITY, OfferSetting, SortType };
