import {
  render, renderPosition, remove, replace, filter,
  topSortFunction, commentedSortFunction, sortDate
} from '../utils/utils.js';
import {
  MOVIE_CARDS_COUNT, TOPRATED_MOVIES_COUNT, MOST_COMMENTED_FILMS
} from '../mock/fake-card.js';
import {
  SortType, UserAction, UpdateType, Pages
} from '../constants.js';


import MoviesContainer from '../view/films-container';
import NoMovies from '../view/no-movies.js';
import Button from '../view/show-more-button.js';
import Sorting from '../view/sort.js';
import Movie from './movie.js';


export default class Page {
  constructor(mainElement, filmsModel, commentsModel) {
    this._mainElement = mainElement;

    this._renderCount = MOVIE_CARDS_COUNT;
    this._moviesContainer = new MoviesContainer();
    this._showMoreButton = new Button();
    this._noMovies = new NoMovies();

    this._currentSortType = SortType.DEFAULT;
    this._sortFilms = new Sorting(this._currentSortType);


    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    // this._filterModel = filterModel;
    this._filterType = Pages.ALL;

    // this._comments = null;
    this._scrollPosition = null;
    this._menuComponent = null;
    this._noFilmsComponent = null;


    this._filmPresenter = new Map();
    this._topFilmPresenter = new Map();
    this._commentedFilmPresenter = new Map();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    // this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderSortFilms();
    render(this._mainElement, this._moviesContainer.getElement(), renderPosition.BEFOREEND);
    this._renderFilmList();
  }

  _getFilms() {
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[this._filterType](films);
    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.slice().sort(sortDate);
      case SortType.RATING:
        return filtredFilms.slice().sort(sortDate);
    }
    return filtredFilms;
  }

  _rerenderSortFilms(sortType) {
    if (this._sortFilms !== null) {
      this._sortFilms = null;
    }
    const newSorting = new Sorting(sortType);
    newSorting.setSortTypeChangeHandler(this._handleSortTypeChange);
    replace(newSorting.getElement(), this._sortFilms);
    this._sortFilms = newSorting;
  }

  _renderSortFilms() {
    render(this._mainElement, this._sortFilms, renderPosition.BEFOREEND);
    this._sortFilms.setSortTypeChangeHandler(this._handleSortTypeChange);
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
        this._filmsModel.updateFilm(updateType, update, comments, scrollPosition);
        break;
      case UserAction.ADD_COMMENTS:
        this._commentsModel.addComment(updateType, update, comments, scrollPosition);
        break;
      case UserAction.DELETE_COMMENTS:
        this._commentsModel.deleteComment(updateType, update, comments, scrollPosition);
        break;
    }
  }


  _handleModelEvent(updateType, data, comments, scrollPosition) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter.get(data.id).init(data, comments, scrollPosition);
        if (this._topFilmPresenter.get(data.id)) {
          this._topFilmPresenter.get(data.id).init(data, comments, scrollPosition);
        }
        if (this._commentedFilmPresenter.get(data.id)) {
          this._commentedFilmPresenter.get(data.id).init(data, comments, scrollPosition);
        }
        break;
      case UpdateType.MINOR:
        this._clearPage();
        this._renderFilmList();
        break;
      case UpdateType.MAJOR:
        this._clearPage({ resetRenderedFilmsCount: true, resetSortType: true });
        this._renderFilmList();
        break;
    }
  }

  _renderFilm(filmListElement, film, presenter, comments) {
    const filmPresenter = new Movie(filmListElement, this._handleViewAction, this._handleModeChange, this._filterType);
    filmPresenter.init(film, comments, this._scrollPosition);
    presenter.set(film.id, filmPresenter);
  }

  _renderFilms(from, to, mainElement, films, presenter, comments) {
    films
      .slice(from, to)
      .forEach((film) => this._renderFilm(mainElement, film, presenter, comments));
  }

  _renderNoFilm() {
    render(this._moviesContainer, this._noMovies, renderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._renderFilmList().length;
    const newRenderedCount = Math.min(filmsCount, this._renderCount + 5);
    this._renderFilms(this._moviesContainer, this._renderFilm, this._commentsModel.getComments());
    this._renderCount = newRenderedCount;

    this._renderFilms(this._renderCount + MOVIE_CARDS_COUNT, this._moviesContainer, this._filmsModel.getFilms(), this._renderFilm);

    if (this._renderCount >= this._filmsModel.getFilms().length) {
      remove(this._showMoreButton);
    }
  }

  _handleModeChange() {
    this._filmPresenter.forEach((presenter) => presenter.resetView());
  }

  _renderShowMoreButton() {

    const filmsContainer = this._mainElement.querySelector('.films');
    const filmsList = filmsContainer.querySelector('.films-list');
    render(filmsList, this._showMoreButton, renderPosition.BEFOREEND);

    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);

  }

  _renderAdditionalFilmList(container, sortFunction, count = 2, presenter, comments) {
    const sortedFilms = sortFunction(this._filmsModel.getFilms()).slice(0, 2);
    this._renderFilms(0, count, container, sortedFilms, presenter, comments);
  }


  _renderFilmList() {
    this._renderSortFilms();
    render(this._mainElement, this._moviesContainer, renderPosition.BEFOREEND);
    const films = this._getFilms();
    const filmsCount = films.length;
    if (filmsCount === 0) {
      this._noMovies();
    } else {
      const filmsContainer = this._mainElement.querySelector('.films');
      const filmsList = filmsContainer.querySelector('.films-list');
      const filmsListContainer = filmsList.querySelector('.films-list__container');
      const comments = this._commentsModel.getComments();
      this._renderFilms(0,
        Math.min(this._filmsModel.getFilms().length, MOVIE_CARDS_COUNT),
        filmsListContainer,
        this._filmsModel.getFilms(),
        this._filmPresenter,
        comments,
      );

      if (this._filmsModel.getFilms().length > MOVIE_CARDS_COUNT) {
        this._renderShowMoreButton();
      }

      const filmListExtraToprated = filmsContainer.querySelector('.films-list--toprated');
      const filmTopratedContainer = filmListExtraToprated.querySelector('.films-list__container');
      const filmListExtraMostCommented = filmsContainer.querySelector('.films-list--most-commented');
      const filmMostCommentedContainer = filmListExtraMostCommented.querySelector('.films-list__container');
      this._renderAdditionalFilmList(filmTopratedContainer,
        topSortFunction,
        TOPRATED_MOVIES_COUNT,
        this._topFilmPresenter,
        comments);

      this._renderAdditionalFilmList(filmMostCommentedContainer,
        commentedSortFunction,
        MOST_COMMENTED_FILMS,
        this._commentedFilmPresenter,
        comments);

    }
  }

  _clearFilmList({ resetRenderedFilmsCount = false, resetSortType = false } = {}) {
    const filmsCount = this._getFilms().length;

    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    remove(this._sortFilms);
    if (this._noFilmsComponent) {
      remove(this._noFilmsComponent);
    }
    remove(this._showMoreButton);

    if (resetRenderedFilmsCount) {
      this._renderedCount = MOVIE_CARDS_COUNT;
    } else {

      this._renderedCount = Math.min(filmsCount, this._renderedCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
