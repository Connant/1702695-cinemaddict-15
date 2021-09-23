import AbstractObserver from './abstract-observer';

export default class MoviesModel extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();
    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update, comments, scroll) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update, comments, scroll);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        movieInfo: {
          title: film['film_info']['title'],
          alternativeTitle: film['film_info']['alternative_title'],
          rating: film['film_info']['total_rating'],
          poster: film['film_info']['poster'],
          ageRating: film['film_info']['age_rating'],
          director: film['film_info']['director'],
          writers: film['film_info']['writers'],
          actors: film['film_info']['actors'],
          runtime: film['film_info']['runtime'],
          genre: film['film_info']['genre'],
          description: film['film_info']['description'],
          release: {
            date: film['film_info']['release']['date'],
            releaseCountry: film['film_info']['release']['release_country'],
          },
        },
        userDetails: {
          watchlist: film['user_details']['watchlist'],
          alreadyWatched: film['user_details']['already_watched'],
          favorite: film['user_details']['favorite'],
          watchingDate: film['user_details']['watching_date'],
        },
      });
    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];
    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'film_info': {
          'title': film.movieInfo.title,
          'alternative_title': film.movieInfo.alternativeTitle,
          'total_rating': film.movieInfo.rating,
          'poster': film.movieInfo.poster,
          'age_rating': film.movieInfo.ageRating,
          'director': film.movieInfo.director,
          'writers': film.movieInfo.writers,
          'actors': film.movieInfo.actors,
          'runtime': film.movieInfo.runtime,
          'genre': film.movieInfo.genre,
          'description': film.movieInfo.description,
          'release': {
            'date': film.movieInfo.release.date,
            'release_country': film.movieInfo.release.releaseCountry,
          },
        },
        'user_details': {
          'watchlist': film.userDetails.watchlist,
          'already_watched': film.userDetails.alreadyWatched,
          'favorite': film.userDetails.favorite,
          'watching_date': film.userDetails.watchingDate,
        },
      },
    );
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;
    return adaptedFilm;
  }
}
