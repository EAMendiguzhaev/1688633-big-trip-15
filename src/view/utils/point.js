import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;

const getTimeDifference = (timeFrom, timeUntil) => {
  let minutes = dayjs(timeUntil).diff(dayjs(timeFrom), 'm');
  const hours = Math.floor(minutes / MINUTES_IN_HOUR);

  minutes = minutes - hours * MINUTES_IN_HOUR;

  if (hours === 0) {
    return `${minutes}M`;
  }

  return `${hours}H ${minutes}M`;
};

const formatDateForEditPoint = (date) => (date !== null ? dayjs(date).format('D/MM/YY HH:mm') : '');

const getTotalDate = (dateFrom, dateUntil) => `${dayjs(dateFrom).format('MMM D')} - ${dayjs(dateUntil).format('D')}`;

const getWeightNullDate = (firstDate, secondDate) => {
  if (firstDate === null && secondDate === null) {
    return 0;
  }

  if (firstDate === null) {
    return 1;
  }

  if (secondDate === null) {
    return -1;
  }

  return null;
};

const sortDay = (firstPoint, secondPoint) => {
  const weight = getWeightNullDate(firstPoint.dateFrom, secondPoint.dateFrom);

  if (weight !== null) {
    return weight;
  }

  return dayjs(firstPoint.dateFrom).diff(dayjs(secondPoint.dateFrom));
};

const sortEvent = (firstPoint, secondPoint) => {
  if (firstPoint.type > secondPoint.type) {
    return 1;
  }

  if (firstPoint.type < secondPoint.type) {
    return -1;
  }

  return 0;
};

const sortTime = (firstPoint, secondPoint) => {
  if (dayjs(firstPoint.dateUntil).diff(dayjs(firstPoint.dateFrom)) < dayjs(secondPoint.dateUntil).diff(dayjs(secondPoint.dateFrom))) {
    return 1;
  }

  if (dayjs(firstPoint.dateUntil).diff(dayjs(firstPoint.dateFrom)) > dayjs(secondPoint.dateUntil).diff(dayjs(secondPoint.dateFrom))) {
    return -1;
  }

  return 0;
};

const sortPrice = (firstPoint, secondPoint) => {
  if (firstPoint.price < secondPoint.price) {
    return 1;
  }

  if (firstPoint.price > secondPoint.price) {
    return -1;
  }

  return 0;
};

const sortOffers = (firstPoint, secondPoint) => {
  if (firstPoint.offers.length < secondPoint.offers.length) {
    return 1;
  }

  if (firstPoint.offers.length > secondPoint.offers.length) {
    return -1;
  }

  return 0;
};

export { getTimeDifference, formatDateForEditPoint, getTotalDate, sortDay, sortEvent, sortTime, sortPrice, sortOffers };
