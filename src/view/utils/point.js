import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;

const getTimeDifference = (timeFrom, timeTo) => {
  let minutes = timeTo.diff(timeFrom, 'm');
  const hours = Math.floor(minutes / MINUTES_IN_HOUR);

  minutes = minutes - hours * MINUTES_IN_HOUR;

  if (hours === 0) {
    return `${minutes}M`;
  }

  return `${hours}H ${minutes}M`;
};

const formatDateForEditPoint = (date) => (date !== null ? dayjs(date).format('D/MM/YY HH:mm') : '');

const getTotalDate = (dateFrom, dateUntil) => `${dayjs(dateFrom).format('MMM D')} - ${dayjs(dateUntil).format('D')}`;

export { getTimeDifference, formatDateForEditPoint, getTotalDate };
