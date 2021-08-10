import { filmsSectionTemplate } from './view/films.js';
import { menuTemplate } from './view/menu.js';
import { createMovieCardTemplate } from './view/movie-card';
import { popupTemplate } from './view/popup';
import { showMoreButtonTemplate } from './view/show-more-button';
import { userRunkTemplate } from './view/user-rank';
// import { createFilmsContainerTemplate } from './view/films-container';
import { generateMovieCard } from './mock/fake-card.js';


const MOVIE_CARDS_COUNT = 20;
const movieCards = new Array(MOVIE_CARDS_COUNT).fill().map(generateMovieCard);


const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, userRunkTemplate(), 'beforeend');
render(mainElement, menuTemplate(), 'beforeend');
render(mainElement, filmsSectionTemplate(), 'beforeend');

const filmsSectionElement = document.querySelector('.films');
const filmsListElement = filmsSectionElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');
const FILM_CARDS_COUNT = 5;

// const EXTRA_FILM_COUNT = 2;

for (let i = 0; i < FILM_CARDS_COUNT; i++) {
  render(filmsListContainerElement, createMovieCardTemplate(movieCards[i]), 'beforeend');
}

if (movieCards.length > FILM_CARDS_COUNT) {
  let renderedCardCount = FILM_CARDS_COUNT;

  render(filmsListElement, showMoreButtonTemplate(), 'beforeend');

  const showMoreButton = filmsListElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movieCards
      .slice(renderedCardCount, renderedCardCount + FILM_CARDS_COUNT)
      .forEach((card) => render(filmsListContainerElement, createMovieCardTemplate(card), 'beforeend'));

    renderedCardCount += FILM_CARDS_COUNT;

    if (renderedCardCount >= movieCards.length) {
      showMoreButton.remove();
    }
  });
}

// render(filmsSectionElement, createFilmsContainerTemplate(), 'beforeend');
render(filmsSectionElement, createMovieCardTemplate(), 'beforeend');
render(filmsSectionElement, showMoreButtonTemplate(), 'beforeend');
render(filmsSectionElement, createMovieCardTemplate(), 'beforeend');
render(filmsSectionElement, createMovieCardTemplate(), 'beforeend');
render(document.body, popupTemplate(), 'beforeend');
