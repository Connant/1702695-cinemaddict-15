import { MAX_LENGTH_DESCRIPTION, EMOJI } from '../constants';

import {
  getRandomInt,
  getRandomFloat, getRandomItem,
  getRandomDescription, formatRuntime, generateDate
} from '../utils/utilts.js';

import dayjs from 'dayjs';

export const POSTERS = [
  'images/posters/the-dance-of-life.jpg',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/the-great-flamarion.jpg',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/made-for-each-other.png',
];

export const MOVIE_TITLES = [
  'The Dance Of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'The Great Flamarion',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Made For Each Other',
];

export const MOVIE_RATIMG = {
  MIN: 2,
  MAX: 10,
};

export const YEAR_OF_ISSUE = [
  '1929',
  '1933',
  '1936',
  '1939',
  '1945',
  '1955',
  '1964',
];

export const MOVIE_DURATION = [
  '16m',
  '54m',
  '1h 18m',
  '1h 21m',
  '1h 32m',
  '1h 55m',
  '1h 59m',
];


export const MOVIE_GENRES = [
  'Comedy',
  'Drama',
  'Horror',
  'Romantic',
  'Thriller',
  'Musical',
];

export const LOREM_IPSUM_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

export const DIRECTORS = [
  'Anthony Mann',
  'Victor Fleming',
  'Blake Edwards',
  'Guy Ritchie',
];

export const WRITERS = [
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
  'Truman Capote',
  'Matthew de Vere Drummond',
];

export const ACTORS = [
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
  'Vivien Leigh',
  'Clark Gable',
  'Audrey Hepburn',
  'Morgan Porterfield Freeman Jr.',
];

export const FILM_PRODUCTION_COUNTRY = [
  'USA',
  'Canada',
  'France',
  'Spain',
  'Germany',
  'Italy',
];

export const MOVIE_CARDS_COUNT = 5;
export const TOPRATED_MOVIES_COUNT = 2;
export const MOST_COMMENTED_FILMS = 2;


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


export const generateMovieCard = (id) => {

  const comments = new Array(getRandomInt(1, 5)).fill().map(generateComment);

  return {
    id: id,
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

