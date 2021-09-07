import MoviesContainer from '../view/films-container';
import Menu from '../view/menu.js';
import Card from '../view/movie-card';
import NoMovies from '../view/no-movies.js';
import Button from '../view/show-more-button.js';
import Sorting from '../view/sort.js';

import {
  render, renderPosition, updateItem, remove, replace,
  topSortFunction, commentedSortFunction, sortRating, sortDate
} from '../utils/utilts.js';
import { MOVIE_CARDS_COUNT, TOPRATED_MOVIES_COUNT, MOST_COMMENTED_FILMS } from '../mock/fake-card.js';

import Movie from './movie.js';

import { SortType } from '../constants.js';


export default class Page {
  constructor(mainElement) {
    this._mainElement = mainElement;

    this._renderCount = MOVIE_CARDS_COUNT;
    this._moviesContainer = new MoviesContainer();
    this._showMoreButton = new Button();
    this._noMovies = new NoMovies();

    this._filmPresenter = new Map();
    this._topFilmPresenter = new Map();
    this._commentedFilmPresenter = new Map();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._currentSortType = SortType.DEFAULT;
    this._sortFilms = new Sorting(this._currentSortType);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();
    this._renderMenu();
    this._renderSortFilms();
    render(this._mainElement, this._moviesContainer.getElement(), renderPosition.BEFOREEND);
    this._renderFilmList();
  }

  _renderMenu() {
    const menuComponent = new Menu(this._films);
    render(this._mainElement, menuComponent, renderPosition.BEFOREEND);
  }

  _rerenderSortFilms(sortType) {
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
    this._sortFilmsList(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _sortFilmsList(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortDate);
        break;
      case SortType.RATING:
        this._films.sort(sortRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _renderTopFilm(filmListElement, film) {
    const topFilmPresenter = new Card(filmListElement, this._handleFilmChange, this._handleModeChange);
    topFilmPresenter.init(film);
    this._topFilmPresenter.set(film.id, topFilmPresenter);
  }

  _renderCommentedFilm(filmListElement, film) {
    const commentedFilmPresenter = new Card(filmListElement, this._handleFilmChange, this._handleModeChange);
    commentedFilmPresenter.init(film);
    this._commentedFilmPresenter.set(film.id, commentedFilmPresenter);
  }

  _handleFilmChange(updatedTask) {
    this._films = updateItem(this._films, updatedTask);

    this._sourcedFilms = updateItem(this._sourcedFilms, updatedTask);
    if (this._filmPresenter.get(updatedTask.id)) {
      this._filmPresenter.get(updatedTask.id).init(updatedTask);
    }
    if (this._topFilmPresenter.get(updatedTask.id)) {
      this._topFilmPresenter.get(updatedTask.id).init(updatedTask);
    }
    if (this._commentedFilmPresenter.get(updatedTask.id)) {
      this._commentedFilmPresenter.get(updatedTask.id).init(updatedTask);
    }
  }

  _renderFilm(filmListElement, film, presenter) {
    const filmPresenter = new Movie(filmListElement, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    presenter.set(film.id, filmPresenter);
  }

  _renderFilms(from, to, mainElement, films, presenter) {
    films
      .slice(from, to)
      .forEach((film) => this._renderFilm(mainElement, film, presenter));
  }

  _renderNoFilm() {
    render(this._moviesContainer, this._noMovies, renderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._renderFilmList().length;
    const newRenderedCount = Math.min(filmsCount, this._renderCount + 5);
    this._renderFilms(this._moviesContainer, this._renderFilm, this._comments);
    this._renderCount = newRenderedCount;

    this._renderFilms(this._renderCount + MOVIE_CARDS_COUNT, this._moviesContainer, this._films, this._renderFilm);

    if (this._renderCount >= this._films.length) {
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

  _renderAdditionalFilmList(container, sortFunction, count = 2, presenter) {
    const sortedFilms = sortFunction(this._films);
    this._renderFilms(0, count, container, sortedFilms, presenter);
  }

  _renderFilmList() {
    if (this._films.length === 0) {
      this._noMovies();
    } else {
      const filmsContainer = this._mainElement.querySelector('.films');
      const filmsList = filmsContainer.querySelector('.films-list');
      const filmsListContainer = filmsList.querySelector('.films-list__container');

      this._renderFilms(0, Math.min(this._films.length, MOVIE_CARDS_COUNT), filmsListContainer, this._films, this._filmPresenter);

      if (this._films.length > MOVIE_CARDS_COUNT) {
        this._renderShowMoreButton();
      }

      const filmListExtraToprated = filmsContainer.querySelector('.films-list--toprated');
      const filmTopratedContainer = filmListExtraToprated.querySelector('.films-list__container');
      const filmListExtraMostCommented = filmsContainer.querySelector('.films-list--most-commented');
      const filmMostCommentedContainer = filmListExtraMostCommented.querySelector('.films-list__container');
      this._renderAdditionalFilmList(filmTopratedContainer, topSortFunction, TOPRATED_MOVIES_COUNT, this._topFilmPresenter);
      this._renderAdditionalFilmList(filmMostCommentedContainer, commentedSortFunction, MOST_COMMENTED_FILMS, this._commentedFilmPresenter);
    }
  }

  _clearFilmList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderCount = MOVIE_CARDS_COUNT;
    remove(this._showMoreButton);
  }
}
