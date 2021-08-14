import { KeyboardKey } from '../common/enums.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomIndex = (array) => getRandomInteger(0, array.length - 1);

const isEscEvent = (evt) => evt.key === KeyboardKey.ESCAPE;

const updateItem = (items, update) => {
  const index = items.findIndex((currentValue) => currentValue.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

export { getRandomInteger, getRandomIndex, isEscEvent, updateItem };
