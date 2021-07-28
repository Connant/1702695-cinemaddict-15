import { filmsSectionTemplate } from './view/films.js';
import { menuTemplate } from './view/menu.js';
import { createMovieCardTemplate } from './view/movie-card';
import { popupTemplate } from './view/popup';
import { showMoreButtonTemplate } from './view/show-more-button';
import { userRunkTemplate } from './view/user-rank';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, userRunkTemplate(), 'beforeend');
render(mainElement, menuTemplate(), 'beforeend');
render(mainElement, filmsSectionTemplate(), 'beforeend');

const filmsSectionElement = document.querySelector('.films');
const FILM_CARDS_COUNT = 5;
// const EXTRA_FILM_COUNT = 2;

for (let i = 0; i < FILM_CARDS_COUNT; i++) {
  render(filmsSectionElement, createMovieCardTemplate(), 'beforeend');
}

render(filmsSectionElement, createMovieCardTemplate(), 'beforeend');
render(filmsSectionElement, showMoreButtonTemplate(), 'beforeend');
render(filmsSectionElement, createMovieCardTemplate(), 'beforeend');
render(filmsSectionElement, createMovieCardTemplate(), 'beforeend');
render(document.body, popupTemplate(), 'beforeend');
