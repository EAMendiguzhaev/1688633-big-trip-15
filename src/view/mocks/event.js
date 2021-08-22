import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { offers } from './offers.js';
import { getRandomInteger, getRandomIndex } from '../utils/common.js';
import { DAY_PASS, HOURS_PASS, MINUTES_PASS, TYPES_OFFERS, CITIES, DESCRIPTION_CITY, OfferSetting } from '../common/const.js';
import { findOffersType } from '../utils/point.js';

const getRandomTypeEvent = () => TYPES_OFFERS[getRandomIndex(TYPES_OFFERS)];

const getRandomDescription = (text) => {
  const sentence = text.slice(0, -1).split('. ');
  const sentenceCount = getRandomInteger(OfferSetting.min, OfferSetting.max);
  const randomIndex = getRandomIndex(sentence);

  return `${sentence.slice(randomIndex, randomIndex + sentenceCount).join('. ')}.`;
};

const generatePhoto = () => {
  const photos = [];

  for (let i = 0; i < getRandomInteger(1, 6); i++) {
    photos.push({
      src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 1000)}`,
      destination: getRandomDescription(DESCRIPTION_CITY),
    });
  }

  return photos;
};

const generateDestination = () => ({
  description: getRandomDescription(DESCRIPTION_CITY),
  name: CITIES[getRandomIndex(CITIES)],
  photos: generatePhoto(),
});

const generateRandomDate = () =>
  dayjs()
    .add(getRandomInteger(-DAY_PASS, DAY_PASS), 'day')
    .add(getRandomInteger(0, HOURS_PASS), 'hour')
    .add(getRandomInteger(0, MINUTES_PASS), 'minute')
    .format('YYYY-MM-DDTHH:mm');

const generateEvent = () => {
  const dateFrom = generateRandomDate();
  const dateUntil = dayjs(dateFrom)
    .add(getRandomInteger(0, getRandomInteger(0, HOURS_PASS)), 'hour')
    .add(getRandomInteger(0, MINUTES_PASS), 'minute')
    .format('YYYY-MM-DDTHH:mm');
  const randomTypePoint = getRandomTypeEvent();

  const typeOffers = findOffersType(offers, randomTypePoint);

  return {
    id: nanoid(),
    type: randomTypePoint,
    destination: generateDestination(),
    dateFrom,
    dateUntil,
    price: getRandomInteger(1, 1000),
    offers: typeOffers.map((item) => ({ ...item, isChecked: Boolean(getRandomInteger(0, 1)) })),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export { generateEvent, getRandomDescription, generatePhoto };
