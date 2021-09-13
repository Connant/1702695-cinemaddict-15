import dayjs from 'dayjs';
import Abstract from '../view/abstract.js';
import { Pages } from '../constants.js';

import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);


export const getRandomInt = (firstNumber = 0, secondNumber = 1) => {
  const larger = Math.ceil(Math.min(firstNumber, secondNumber));
  const lesser = Math.floor(Math.max(firstNumber, secondNumber));

  return Math.floor(larger + Math.random() * (lesser - larger + 1));
};

export const getRandomFloat = (firstNumber, secondNumber, digits = 1) => {
  const min = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const max = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const result = Math.random() * (max - min) + min;

  return result.toFixed(digits);
};

export const getRandomItem = (items) => items[getRandomInt(0, items.length - 1)];

export const getRandomDescription = (items) => {
  const randomIndex = getRandomInt(0, items.length - 1);
  const randomDescription = items.slice(0, randomIndex + 1);
  return randomDescription;
};

export const generateDate = () => {
  const yearsGap = getRandomInt(-126, 0);
  const daysGap = getRandomInt(-16, 15);
  const hoursGap = getRandomInt(-12, 12);
  return dayjs().add(daysGap, 'day').add(yearsGap, 'year').add(hoursGap, 'hour').toDate();
};

export const getDayMonthFormat = (dueDate) => dayjs(dueDate).format('D MMMM');
export const getYearsFormat = (dueDate) => dayjs(dueDate).format('YYYY');

export const formatRuntime = (dueDate) => dayjs(dueDate).format('HH:MM');

export const generateRuntime = (runtime) => {
  const hour = dayjs.duration(runtime, 'm').format('H');
  const minute = dayjs.duration(runtime, 'm').format('mm');
  if (runtime < 60) {
    return `${minute}m`;
  }
  return `${hour}h ${minute}m`;
};


export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const isEscEvent = (evt) => evt.key === 'Esc' || evt.key === 'Escape';


export const renderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place = renderPosition.BEFOREEND) => {

  if (container instanceof Abstract) {
    container = container.getElement();
  }
  if (element instanceof Abstract) {
    element = element.getElement();
  }
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }
  const el = component.getElement();
  el.remove();
  component.removeElement();
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }
  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const topSortFunction = (films) => [...films].sort((a, b) => b.movieInfo.rating - a.movieInfo.rating);
export const commentedSortFunction = (films) => [...films].sort((a, b) => b.comments.length - a.comments.length);
export const sortDate = (movieFirst, movieSecond) => dayjs(movieSecond.movieInfo.release.date).diff(dayjs(movieFirst.movieInfo.release.date));
export const sortRating = (movieFirst, movieSecond) => movieSecond.movieInfo.rating - movieFirst.movieInfo.rating;


export const filter = {
  [Pages.ALL]: (films) => films,
  [Pages.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [Pages.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [Pages.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};

export const getGenres = (films) => {
  const genresArray = films.map((film) => film.movieInfo.genre).flat();
  return [...new Set(genresArray)];

};


export const getNumberFilmsGenre = (films) => {
  const genres = getGenres(films);
  const result = {};
  genres.forEach((genre) => {
    result[genre] = 0;
    films.forEach((film) => {
      if (genre === film.movieInfo.genre) {
        result[genre] += 1;
      }
    });
  });
  return result;
};

export const getSortGenresFilms = (obj) => {
  const newObj = {};
  Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((i) => newObj[i] = obj[i]);
  return newObj;
};

export const completedFimsInDateRange = (films, dateFrom, dateTo, format) => films.filter((film) =>
  dayjs(film.userDetails.watchingDate).isBetween(dateFrom, dateTo, format, '[]'));
