import { KeyboardKey } from '../common/enums.js';

const regularExpression = new RegExp('^\\d+$');

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomIndex = (array) => getRandomInteger(0, array.length - 1);

const isEscEvent = (evt) => evt.key === KeyboardKey.ESCAPE;

const isNumber = (value) => regularExpression.test(value);

export { getRandomInteger, getRandomIndex, isEscEvent, isNumber };
