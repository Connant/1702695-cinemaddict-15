import { formatRuntime } from '../mock/utilts.js';
import { createElement } from '../mock/utilts.js';

export const createMovieCardTemplate = (card) => {
  const { movieInfo, userDetails } = card;

  const runtimeMovie = formatRuntime(movieInfo.runtime);

  const setCardControlsItemActive = (value) => value ? 'film-card__controls-item--active' : '';

  const watchlistClassActive = setCardControlsItemActive(userDetails.watchlist);
  const alreadyWatchedClassActive = setCardControlsItemActive(userDetails.alreadyWatched);
  const favoriteClassActive = setCardControlsItemActive(userDetails.favorite);

  return `<article class="film-card">
    <h3 class="film-card__title">${movieInfo.title}</h3>
  <p class="film-card__rating">${movieInfo.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${movieInfo.year}</span>
      <span class="film-card__duration">${runtimeMovie}</span>
      <span class="film-card__genre">${movieInfo.genre}</span>
    </p>
    <img src="${movieInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${movieInfo.description}</p>
    <a class="film-card__comments">${movieInfo.commentsCount} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassActive}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassActive}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassActive}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Card {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createMovieCardTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

