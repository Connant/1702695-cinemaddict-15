import { render, renderPosition, remove, replace, isEscEvent } from '../utils/utils.js';
import Card from '../view/movie-card';
import Popup from '../view/popup.js';
import { Mode, UserAction, UpdateType, Pages } from '../constants.js';

export default class Movie {
  constructor(container, changeData, changeMode, filterType) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._bodyElement = document.querySelector('body');

    this._filmComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;
    this._filterType = filterType;

    this._clickHandler = this._clickHandler.bind(this);
    this._clickClose = this._clickClose.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film, comments, scrollPosition) {
    this._film = film;
    this._comments = comments;
    this._scrollPosition = scrollPosition;
    this._comments = this._getCommentsFilm(this._film);

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new Card(this._film);
    this._popupComponent = new Popup(this._film, this._changeData, this._comments, this._scrollPosition, this._saveScroll);


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

      this._bodyElement.classList.add('hide-overflow');
      this._bodyElement.scroll(0,this._scrollPosition);
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

  _getCommentsFilm(film) {
    const commentsIds = film.comments;
    return this._comments.filter((comment) => commentsIds.includes(comment.id));
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._filterType !== Pages.FAVORITES ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            favorite: !this._film.userDetails.favorite,
          },
        },
      ), this._comments, this._scrollPosition,
    );
    this._bodyElement.scrollTop = this._scrollPosition;
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._filterType !== Pages.WATCHLIST ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            watchlist: !this._film.userDetails.watchlist,
          },
        },
      ), this._comments, this._scrollPosition,
    );
    this._bodyElement.scrollTop = this._scrollPosition;
  }

  _handleHistoryClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._filterType !== Pages.HISTORY ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            alreadyWatched: !this._film.userDetails.alreadyWatched,
          },
        },
      ), this._comments, this._scrollPosition,
    );
    this._bodyElement.scrollTop = this._scrollPosition;
  }

  _clickHandler() {
    this._openPopupFilm();
    document.addEventListener('keydown', this._onEscKeyDown);
    this._bodyElement.classList.add('hide-overflow');
  }

  _clickClose() {
    this._onClosePopup();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _openPopupFilm() {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    this._bodyElement.classList.add('hide-overflow');
    render(this._bodyElement, this._popupComponent, renderPosition.BEFOREEND);
    this._mode = Mode.POPUP;
    this._changeMode();
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

  _restoreHandlers() {
    this._popupComponent.setClickHandler(this._clickClose);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setAlreadyWatchedClickHandler(this. _handleHistoryClick);
  }

  _saveScroll(scrollPosition) {
    this._scrollPosition = scrollPosition;
  }
}
