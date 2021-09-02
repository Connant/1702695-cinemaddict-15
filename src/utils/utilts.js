import dayjs from 'dayjs';
import Abstract from '../view/abstract.js';

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

export const formatReleaseDate = (releaseDate) => dayjs(releaseDate).format('DD MM YYYY');

export const formatRuntime = (runtime) => `${Math.floor(runtime / 60)}h ${runtime % 60}m`;

export const generateDate = () => {
  const maxDaysGap = 7;
  const yearsGap = getRandomInt(-50, 0);
  const daysGap = getRandomInt(-maxDaysGap, maxDaysGap);
  const hoursGap = getRandomInt(-12, 12);
  return dayjs().add(daysGap, 'day').add(yearsGap, 'year').add(hoursGap, 'hour').toDate();
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
  component.getElement().remove();
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

