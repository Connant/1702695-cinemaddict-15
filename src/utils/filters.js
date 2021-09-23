import dayjs from 'dayjs';
import { Pages } from '../constants.js';


const getGenres = (films) => {
  const genresArray = films.map((film) => film.movieInfo.genre).flat();
  return [...new Set(genresArray)];
};

export const getNumberFilmsGenre = (films) => {
  const genres = getGenres(films);
  const result = {};
  genres.forEach((genre) => {
    result[genre] = 0;
    films.forEach((film) => film.movieInfo.genre.forEach((item) => {
      if (genre === item) {
        result[genre] += 1;
      }
    }));
  });
  return result;
};

export const getSortGenresFilms = (obj) => {
  const newObj = {};
  Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((i) => newObj[i] = obj[i]);
  return newObj;
};

export const completedFilmsInDateRange = (films, dateFrom, dateTo, format) => films.filter((film) =>
  dayjs(film.userDetails.watchingDate).isBetween(dateFrom, dateTo, format, '[]'));

export const filter = {
  [Pages.ALL]: (films) => films,
  [Pages.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [Pages.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [Pages.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};

export const topSort = (films) => [...films].sort((a, b) => b.movieInfo.rating - a.movieInfo.rating);
export const commentedSort = (films) => [...films].sort((a, b) => b.comments.length - a.comments.length);
export const sortDate = (movieFirst, movieSecond) => dayjs(movieSecond.movieInfo.release.date).diff(dayjs(movieFirst.movieInfo.release.date));
export const sortRating = (movieFirst, movieSecond) => movieSecond.movieInfo.rating - movieFirst.movieInfo.rating;

