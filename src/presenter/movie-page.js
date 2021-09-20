import {
  render, renderPosition, remove, replace, filter,
  topSortFunction, commentedSortFunction, sortDate, sortRating
} from '../utils/utils.js';
import {
  SortType, UserAction, UpdateType, Pages
} from '../constants.js';
import MoviesContainer from '../view/films-container';
import NoMovies from '../view/no-movies.js';
import Button from '../view/show-more-button.js';
import Sorting from '../view/sort.js';
import Movie from './movie.js';
import Loading from '../view/loading.js';
import NumbersFilms from '../view/footer.js';

import UserRunk from '../view/user-rank.js';

export const MOVIE_CARDS_COUNT = 5;
export const TOPRATED_MOVIES_COUNT = 2;
export const MOST_COMMENTED_FILMS = 2;

export default class Page {
  constructor(mainElement, filmsModel, commentsModel, pageModel, api, headerElement) {
    this._mainElement = mainElement;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._pageModel = pageModel;
    this._api = api;
    this._headerElement = headerElement;

    this._renderCount = MOVIE_CARDS_COUNT;

    this._moviesContainer = new MoviesContainer();
    this._showMoreButton = new Button();
    this._noMovies = new NoMovies();
    this._loadingComponent = new Loading();
    this._currentSortType = SortType.DEFAULT;
    this._sortFilms = new Sorting(this._currentSortType);

    this._filterType = Pages.ALL;
    this._isLoading = true;
    this._comments = [];

    this._scrollPosition = null;
    this._menuComponent = null;
    this._noFilmsComponent = null;
    this._ratingComponent = null;

    this._filmPresenter = new Map();
    this._topFilmPresenter = new Map();
    this._commentedFilmPresenter = new Map();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
    this._pageModel.subscribe(this._handleModelEvent);
  }

  init() {
    render(this._mainElement, this._moviesContainer.getElement(), renderPosition.BEFOREEND);
    this._renderPage();
  }

  _getFilms() {
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[this._filterType](films);
    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.slice().sort(sortDate);
      case SortType.RATING:
        return filtredFilms.slice().sort(sortRating);
    }
    return filtredFilms;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._rerenderSortFilms(sortType);
    this._currentSortType = sortType;
    this._clearPage({ resetRenderedFilmsCount: true });
    this._renderFilmList();
  }

  _handleViewAction(actionType, updateType, update, comments, scrollPosition) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response, comments, scrollPosition);
        });
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update, comments, scrollPosition);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update, comments, scrollPosition);
        break;
    }
  }

  _handleModelEvent(updateType, data, comments, scrollPosition) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._filmPresenter.get(data.id)) {
          this._filmPresenter.get(data.id).init(data, scrollPosition);
        }
        if (this._topFilmPresenter.get(data.id)) {
          this._topFilmPresenter.get(data.id).init(data, scrollPosition);
        }
        if (this._commentedFilmPresenter.get(data.id)) {
          this._commentedFilmPresenter.get(data.id).init(data, scrollPosition);
        }
        this._renderRating();
        break;
      case UpdateType.MINOR:
        this._clearPage();
        this._renderFilmList();
        break;
      case UpdateType.MAJOR:
        this._clearPage({ resetRenderedFilmsCount: true, resetSortType: true });
        this._filterType = data;
        this._renderFilmList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderPage();
        break;
    }
  }

  _handleShowMoreButtonClick() {
    const filmsContainer = this._mainElement.querySelector('.films');
    const filmsList = filmsContainer.querySelector('.films-list');
    const filmsListContainer = filmsList.querySelector('.films-list__container');
    const films = this._getFilms();
    const newRenderedCount = Math.min(films.length, this._renderCount + 5);
    this._renderFilms(this._renderCount, newRenderedCount, filmsListContainer, films, this._filmPresenter);
    this._renderCount = newRenderedCount;
    if (this._renderCount >= this._filmsModel.getFilms().length) {
      remove(this._showMoreButton);
    }
  }

  _handleModeChange() {
    this._filmPresenter.forEach((presenter) => presenter.resetView());
  }

  _renderLoading() {
    render(this._mainElement, this._loadingComponent, renderPosition.BEFOREEND);
  }

  _renderNoFilm() {
    render(this._moviesContainer, this._noMovies, renderPosition.BEFOREEND);
  }

  _renderRating() {
    this._ratingComponent.getElement().remove();
    this._ratingComponent.removeElement();
    this._ratingComponent = new UserRunk(this._filmsModel.getFilms());
    render(this._headerElement, this._ratingComponent.getElement(), renderPosition.BEFOREEND);
  }

  _rerenderSortFilms(sortType) {
    const newSorting = new Sorting(sortType);
    newSorting.setSortTypeChangeHandler(this._handleSortTypeChange);
    replace(newSorting.getElement(), this._sortFilms);
    this._sortFilms = newSorting;
  }

  _renderSortFilms() {
    this._rerenderSortFilms(this._currentSortType);
    render(this._mainElement, this._sortFilms, renderPosition.BEFOREEND);
  }

  _renderFilm(filmListElement, film, presenter) {
    const movieCard = new Movie(filmListElement, this._handleViewAction,
      this._handleModeChange, this._filterType, this._api, this._commentsModel);

    movieCard.init(film, this._scrollPosition);
    presenter.set(film.id, movieCard);
  }

  _renderFilms(from, to, mainElement, films, presenter) {
    films
      .slice(from, to)
      .forEach((film) => this._renderFilm(mainElement, film, presenter));
  }

  _renderFilmList() {
    this._renderSortFilms();
    if (this._ratingComponent === null) {
      this._ratingComponent = new UserRunk(this._filmsModel.getFilms());
      this._renderRating();
    }
    render(this._mainElement, this._moviesContainer, renderPosition.BEFOREEND);
    const films = this._getFilms();
    const filmsCount = films.length;
    const filmsContainer = this._mainElement.querySelector('.films');
    const filmsList = filmsContainer.querySelector('.films-list');
    const filmsListContainer = filmsList.querySelector('.films-list__container');
    this._renderFilms(0,
      Math.min(filmsCount, MOVIE_CARDS_COUNT),
      filmsListContainer,
      films,
      this._filmPresenter,
    );
    if (filmsCount > MOVIE_CARDS_COUNT) {
      this._renderShowMoreButton();
    } else {
      remove(this._showMoreButton);
    }
  }

  _renderShowMoreButton() {
    const filmsContainer = this._mainElement.querySelector('.films');
    const filmsList = filmsContainer.querySelector('.films-list');
    render(filmsList, this._showMoreButton, renderPosition.BEFOREEND);
    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderAdditionalFilmList(container, sortFunction, count = 2, presenter) {
    const sortedFilms = sortFunction(this._filmsModel.getFilms()).slice(0, 2);
    this._renderFilms(0, count, container, sortedFilms, presenter);
  }

  _renderFooter(films) {
    this._numbersFilms = new NumbersFilms(films);
    const siteFooterElement = document.querySelector('.footer');
    const siteFooterSectionElement = siteFooterElement.querySelector('.footer__statistics');
    render(siteFooterSectionElement, this._numbersFilms, renderPosition.BEFOREEND);
  }

  _renderPage() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    const films = this._getFilms();
    const filmsCount = films.length;
    if (filmsCount === 0) {
      render(this._mainElement, this._noMovies());
    } else {
      this._renderFilmList();

      const filmsContainer = this._mainElement.querySelector('.films');
      const filmListExtraToprated = filmsContainer.querySelector('.films-list--toprated');
      const filmTopratedContainer = filmListExtraToprated.querySelector('.films-list__container');
      const filmListExtraMostCommented = filmsContainer.querySelector('.films-list--most-commented');
      const filmMostCommentedContainer = filmListExtraMostCommented.querySelector('.films-list__container');
      this._renderAdditionalFilmList(filmTopratedContainer,
        topSortFunction,
        TOPRATED_MOVIES_COUNT,
        this._topFilmPresenter,
      );
      this._renderAdditionalFilmList(filmMostCommentedContainer,
        commentedSortFunction,
        MOST_COMMENTED_FILMS,
        this._commentedFilmPresenter,
      );

      this._renderFooter(this._filmsModel.getFilms());
    }
  }

  _clearPage({ resetRenderedFilmsCount = false, resetSortType = false } = {}) {
    const filmsCount = this._getFilms().length;
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    remove(this._sortFilms);
    if (this._noFilmsComponent) {
      remove(this._noFilmsComponent);
    }
    remove(this._loadingComponent);
    remove(this._showMoreButton);
    if (resetRenderedFilmsCount) {
      this._renderCount = MOVIE_CARDS_COUNT;
    } else {
      this._renderCount = Math.min(filmsCount, this._renderCount);
    }
    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  hide() {
    this._sortFilms.hide();
    this._moviesContainer.hide();
    this._filmPresenter.forEach((item) => item._filmComponent.hide());
    this._showMoreButton.hide();
    this._topFilmPresenter.forEach((item) => item._filmComponent.hide());
    this._commentedFilmPresenter.forEach((item) => item._filmComponent.hide());
  }

  show() {
    this._sortFilms.show();
    this._moviesContainer.show();
    this._filmPresenter.forEach((item) => item._filmComponent.show());
    this._showMoreButton.show();
    this._topFilmPresenter.forEach((item) => item._filmComponent.show());
    this._commentedFilmPresenter.forEach((item) => item._filmComponent.show());
  }
}
