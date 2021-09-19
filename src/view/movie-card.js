import { getTimeFormat, getYearsFormat } from '../utils/utils.js';
import Abstract from './abstract.js';

export const createMovieCardTemplate = (card) => {
  const { comments, movieInfo, userDetails } = card;

  const runtimeMovie = getTimeFormat(movieInfo.runtime);

  const setCardControlsItemActive = (value) => value ? 'film-card__controls-item--active' : '';

  const watchlistClassActive = setCardControlsItemActive(userDetails.watchlist);
  const alreadyWatchedClassActive = setCardControlsItemActive(userDetails.alreadyWatched);
  const favoriteClassActive = setCardControlsItemActive(userDetails.favorite);

  return `<article class="film-card">
    <h3 class="film-card__title">${movieInfo.title}</h3>
  <p class="film-card__rating">${movieInfo.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${getYearsFormat(movieInfo.release.date)}</span>
      <span class="film-card__duration">${runtimeMovie}</span>
      <span class="film-card__genre">${movieInfo.genre.slice(0, 1)}</span>
    </p>
    <img src="${movieInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${movieInfo.description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassActive}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassActive}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassActive}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Card extends Abstract {
  constructor(card) {
    super();
    this._card = card;
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._card);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setAlreadyWatchedClickHandler(callback){
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._alreadyWatchedClickHandler);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
  }
}
