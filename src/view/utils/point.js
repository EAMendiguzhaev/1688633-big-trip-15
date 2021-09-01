import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

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

const getTimeDifferenceMs = (start, end) => dayjs(end).diff(dayjs(start));

const getTimeFormatted = (timeInMs) => {
  const time = {
    hours: dayjs.duration(timeInMs).hours() > 0 ? dayjs.duration(timeInMs).hours() + 'H ' : '',
    minutes: dayjs.duration(timeInMs).minutes() > 0 ? dayjs.duration(timeInMs).minutes() + 'M' : '',
  };

  return time.hours + time.minutes;
};

const formatDateForEditPoint = (date) => (date !== null ? dayjs(date).format('D/MM/YY HH:mm') : '');

const getTotalDate = (dateFrom, dateUntil) => `${dayjs(dateFrom).format('MMM D')} - ${dayjs(dateUntil).format('MMM D')}`;

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

const findOffersType = (offers, type) => offers.find((currentValue) => currentValue.type.toLowerCase() === type.toLowerCase()).offers;

const isPointFuture = (date) => dayjs(date).isSameOrAfter(dayjs());

const isPointPast = (date) => dayjs(date).isBefore(dayjs());

export {
  getTimeDifference,
  formatDateForEditPoint,
  getTotalDate,
  sortDay,
  sortTime,
  sortPrice,
  findOffersType,
  isPointFuture,
  isPointPast,
  getTimeDifferenceMs,
  getTimeFormatted,
};
