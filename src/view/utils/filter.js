import { FilterType } from '../common/const.js';
import { isPointFuture, isPointPast } from './point.js';

const filter = {
  [FilterType.FUTURE]: (points) => points.filter((currentValue) => isPointFuture(currentValue.dateUntil)),
  [FilterType.PAST]: (points) => points.filter((currentValue) => isPointPast(currentValue.dateFrom)),
  [FilterType.EVERYTHING]: (points) => points,
};

export { filter };
