// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/floor

import dayjs from 'dayjs';

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


// todo https://day.js.org/docs/en/display/format
// todo https://www.codegrepper.com/code-examples/javascript/dayjs+format

export const formatReleaseDate = (releaseDate) => dayjs(releaseDate).format('DD MM YYYY');

export const formatRuntime = (runtime) => `${Math.floor(runtime / 60)}h ${runtime % 60}m`;

export const generateDate = () => {
  const maxDaysGap = 7;
  const yearsGap = getRandomInt(-50,0);
  const daysGap = getRandomInt(-maxDaysGap, maxDaysGap);
  const hoursGap =  getRandomInt(-12,12);
  return dayjs().add(daysGap, 'day').add(yearsGap, 'year').add(hoursGap, 'hour').toDate();
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};


// export const ESC_IE = 'Esc';
//  export const ESC_ALL_BROWSERS = 'Escape';

export const isEscEvent = (evt) => evt.key === 'Esc' || evt.key === 'Escape';
