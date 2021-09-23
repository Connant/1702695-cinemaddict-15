import dayjs from 'dayjs';


import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export const getDayMonthFormat = (dueDate) => dayjs(dueDate).format('D MMMM');
export const getYearsFormat = (dueDate) => dayjs(dueDate).format('YYYY');
export const getTimeFormat = (dueDate) => dayjs(dueDate).format('HH:MM');

export const generateRuntime = (runtime) => {
  const hour = dayjs.duration(runtime, 'm').format('H');
  const minute = dayjs.duration(runtime, 'm').format('mm');
  if (runtime < 60) {
    return `${minute}m`;
  }
  return `${hour}h ${minute}m`;
};

export const isEscEvent = (evt) => evt.key === 'Esc' || evt.key === 'Escape';
