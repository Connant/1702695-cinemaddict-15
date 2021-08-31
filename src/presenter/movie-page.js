import MoviesContainer from '../view/films-container';
import Menu from '../view/menu.js';
import Card from '../view/movie-card';
import NoMovies from '../view/no-movies.js';
import Button from '../view/show-more-button.js';
import Sorting from '../view/sort.js';

import { render, renderPosition, updateItem, topSortFunction, commentedSortFunction, remove } from '../utils/utilts.js';
import { MOVIE_CARDS_COUNT, TOPRATED_MOVIES_COUNT, MOST_COMMENTED_FILMS } from '../mock/fake-card.js';

import Movie from './movie.js';


export default class Page {
  constructor(mainElement) {
    this._mainElement = mainElement;
    this._renderCount = MOVIE_CARDS_COUNT;
    this._moviesContainer = new MoviesContainer();
    this._movieCard = new Card();
    this._showMoreButton = new Button();
    this._noMovies = new NoMovies();
    this._sortFilms = new Sorting();
    this._filmPresenter = new Map();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._renderMenu();
    this._renderSortFilms();
    render(this._mainElement, this._moviesContainer.getElement(), renderPosition.BEFOREEND);
    this._renderFilmList();

  }

  _renderMenu() {
    const menuComponent = new Menu(this._films);
    render(this._mainElement, menuComponent, renderPosition.BEFOREEND);
  }

  _renderSortFilms() {
    render(this._mainElement, this._sortFilms, renderPosition.BEFOREEND);
  }

  _handleFilmChange(updatedTask) {
    this._films = updateItem(this._films, updatedTask);
    this._filmPresenter.get(updatedTask.id).init(updatedTask);
  }

  _renderFilm(filmListElement, film) {
    const filmPresenter = new Movie(filmListElement, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter.set(film.id, filmPresenter);
  }

  _renderFilms(from, to, mainElement, films) {
    films
      .slice(from, to)
      .forEach((film) => this._renderFilm(mainElement, film));
  }

  _renderNoFilm() {
    render(this._moviesContainer, this._noMovies, renderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderCount, this._renderCount + MOVIE_CARDS_COUNT, this._moviesContainer, this._films);
    this._renderCount += MOVIE_CARDS_COUNT;

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

  _renderAdditionalFilmList(container, sortFunction, count = 2) {
    const sortedFilms = sortFunction(this._films);
    this._renderFilms(0, count, container, sortedFilms);
  }

  _renderFilmList() {
    if (this._films.length === 0) {
      this._noMovies();
    } else {
      const filmsContainer = this._mainElement.querySelector('.films');
      const filmsList = filmsContainer.querySelector('.films-list');
      const filmsListContainer = filmsList.querySelector('.films-list__container');

      this._renderFilms(0, Math.min(this._films.length, MOVIE_CARDS_COUNT), filmsListContainer, this._films);
      if (this._films.length > MOVIE_CARDS_COUNT) {
        this._renderShowMoreButton();
      }

      const filmListExtraToprated = filmsContainer.querySelector('.films-list--toprated');
      const filmTopratedContainer = filmListExtraToprated.querySelector('.films-list__container');
      const filmListExtraMostCommented = filmsContainer.querySelector('.films-list--most-commented');
      const filmMostCommentedContainer = filmListExtraMostCommented.querySelector('.films-list__container');
      this._renderAdditionalFilmList(filmTopratedContainer, topSortFunction, TOPRATED_MOVIES_COUNT);
      this._renderAdditionalFilmList(filmMostCommentedContainer, commentedSortFunction, MOST_COMMENTED_FILMS);
    }
  }

  _clearFilmList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderCount = MOVIE_CARDS_COUNT;
    remove(this._showMoreButton);
  }
}
