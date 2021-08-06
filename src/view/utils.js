import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
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

const formatDateForEditPoint = (date) => (date !== null ? dayjs(date).format('D/MM/YY HH:mm') : '');

const getTotalDate = (dateFrom, dateUntil) => `${dayjs(dateFrom).format('MMM D')} - ${dayjs(dateUntil).format('D')}`;

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN: {
      container.prepend(element);
      break;
    }
    case RenderPosition.BEFOREEND: {
      container.append(element);
      break;
    }
  }
};

const createNode = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export { RenderPosition, render, createNode, getRandomInteger, getRandomIndex, getTimeDifference, formatDateForEditPoint, getTotalDate };
