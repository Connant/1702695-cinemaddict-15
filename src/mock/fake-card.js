import {
  POSTERS,
  MOVIE_TITLES,
  YEAR_OF_ISSUE,
  MOVIE_DURATION,
  MOVIE_GENRES,
  LOREM_IPSUM_DESCRIPTIONS,
  DIRECTORS,
  WRITERS,
  ACTORS,
  FILM_PRODUCTION_COUNTRY,
  MAX_LENGTH_DESCRIPTION,
  EMOJI
} from './constants';

import {
  getRandomInt,
  getRandomFloat, getRandomItem,
  getRandomDescription, formatRuntime, generateDate
} from './utilts.js';

import dayjs from 'dayjs';

const createDescription = () => {
  const description = getRandomDescription(LOREM_IPSUM_DESCRIPTIONS).join('');

  if (description.length > MAX_LENGTH_DESCRIPTION) {
    return `${description.substring(0, MAX_LENGTH_DESCRIPTION - 1)}...`;
  }
  return description;
};

const getRandomBoolean = () => !!Math.round(Math.random());

export const generateComment = () => ({
  id: '42',
  author: 'Audrey Hepburn',
  comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  date: '2019-05-11T16:12:32.554Z',
  emoji: getRandomItem(EMOJI),
});


export const generateMovieCard = () => {

  const comments = new Array(getRandomInt(1, 5)).fill().map(generateComment);

  return {
    id: '0',
    comments,
    movieInfo: {
      title: getRandomItem(MOVIE_TITLES),
      alternativeTitle: 'Movie title',
      poster: getRandomItem(POSTERS),
      year: getRandomItem(YEAR_OF_ISSUE),
      duration: getRandomItem(MOVIE_DURATION),
      runtime: formatRuntime(100),
      genre: getRandomItem(MOVIE_GENRES),
      rating: getRandomFloat(1, 10),
      director: getRandomItem(DIRECTORS),
      writers: getRandomItem(WRITERS),
      actors: getRandomItem(ACTORS),
      release: {
        date: dayjs(generateDate(YEAR_OF_ISSUE)).format('D MMMM YYYY HH:MM'),
        releaseCountry: getRandomItem(FILM_PRODUCTION_COUNTRY),
      },
      ageRating: getRandomInt(0, 18),
      description: createDescription(),
      commentsCount: getRandomInt(2, 5),
      commentEmotion: getRandomItem(EMOJI),
    },
    userDetails: {
      watchlist: getRandomBoolean(getRandomInt(0, 1)),
      alreadyWatched: getRandomBoolean(getRandomInt(0, 1)),
      watchingDate: dayjs(generateDate()).format('D MMMM YYYY HH:MM'),
      favorite: getRandomBoolean(getRandomInt(0, 1)),
    },
  };
};

