import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomIndex = (array) => getRandomInteger(0, array.length - 1);

const getTimeDifference = (timeFrom, timeUntil) => {
  let minutes = timeUntil.diff(timeFrom, 'm');
  const hours = Math.floor(minutes / MINUTES_IN_HOUR);

  minutes = minutes - hours * MINUTES_IN_HOUR;

  if (hours === 0) {
    return `${minutes}M`;
  }

  return `${hours}H ${minutes}M`;
};

const formatDateForEditPoint = (date) => {
  if (date !== null) {
    return dayjs(date).format('D/MM/YY HH:mm');
  } else {
    return '';
  }
};

const getTotalDate = (dateFrom, dateUntil) => `${dayjs(dateFrom).format('MMM D')} - ${dayjs(dateUntil).format('D')}`;

export { renderTemplate, getRandomInteger, getRandomIndex, getTimeDifference, formatDateForEditPoint, getTotalDate };