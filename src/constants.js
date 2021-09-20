export const MAX_LENGTH_DESCRIPTION = 140;

export const EMOJI = [
  'images/emoji/angry.png',
  'images/emoji/puke.png',
  'images/emoji/sleeping.png',
  'images/emoji/smile.png',
];

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const COUNT = 40;


export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const Pages = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  STATISTIC: 'statistics',
};

export const NoFilmsTextType = {
  [Pages.All]: 'There are no movies in our database',
  [Pages.WATCHLIST]: 'There are no movies to watch now',
  [Pages.HISTORY]: 'There are no watched movies now',
  [Pages.FAVORITES]: 'There are no favorite movies now',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export const CurrentType = {
  ALL: 'allTime',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export const UserLevel = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie buff',
};
