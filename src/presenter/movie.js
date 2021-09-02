import { render, renderPosition, remove, replace, isEscEvent } from '../utils/utilts.js';
import Card from '../view/movie-card';
import Popup from '../view/popup.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Movie {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._bodyElement = document.querySelector('body');

    this._filmComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._clickHandler = this._clickHandler.bind(this);
    this._clickClose = this._clickClose.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new Card(film);
    this._popupComponent = new Popup(film);


    this._filmComponent.setClickHandler(this._clickHandler);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleHistoryClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._popupComponent.setClickHandler(this._clickClose);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setAlreadyWatchedClickHandler(this._handleHistoryClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this._container, this._filmComponent, renderPosition.BEFOREEND);
      return;
    }

    if (this._container.contains((prevFilmComponent.getElement())) && this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);

    }
    if (this._bodyElement.contains((prevPopupComponent.getElement())) && this._mode === Mode.POPUP) {
      replace(this._popupComponent, prevPopupComponent);
      replace(this._filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);

  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._onClosePopup();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            favorite: !this._film.userDetails.favorite,
          },
        },
      ),
    );
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            watchlist: !this._film.userDetails.watchlist,
          },
        },
      ),
    );
  }

  _handleHistoryClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            alreadyWatched: !this._film.userDetails.alreadyWatched,
          },
        },
      ),
    );
  }

  _clickHandler() {
    this._openPopupFilm();
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _clickClose() {
    this._onClosePopup();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _openPopupFilm() {
    this._bodyElement.classList.add('hide-overflow');
    render(this._bodyElement, this._popupComponent, renderPosition.BEFOREEND);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _onClosePopup() {
    this._bodyElement.classList.remove('hide-overflow');
    this._popupComponent.getElement().remove();
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._onClosePopup();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }
}
