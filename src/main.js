
import MoviesContainer from './view/films-container';
import Menu from './view/menu.js';
import Card from './view/movie-card';
import NoMovies from './view/no-movies.js';
import Popup from './view/popup';
import Button from './view/show-more-button';
import Sorting from './view/sort';
import UserRunk from './view/user-rank';
import { generateMovieCard } from './mock/fake-card.js';

import { isEscEvent } from './utils/utilts.js';

import { render, renderPosition } from './utils/render.js';
import { MOVIE_CARDS_COUNT, TOPRATED_MOVIES, MOST_COMMENTED_FILMS } from './constants';


const movieCards = new Array(MOVIE_CARDS_COUNT).fill().map(generateMovieCard);

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const popupElement = new Popup(movieCards[0]).getElement();
const popupClose = popupElement.querySelector('.film-details__close-btn');

const onClosePopup = () => {
  bodyElement.removeChild(popupElement);
  bodyElement.classList.remove('hide-overflow');
  popupClose.removeEventListener('click', onClosePopup);
};

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onClosePopup();
    document.removeEventListener('keydown', onEscKeydown);
  }
};

const onFilmCardClick = () => {
  bodyElement.appendChild(popupElement);
  bodyElement.classList.add('hide-overflow');
  popupClose.addEventListener('click', onClosePopup);
  document.addEventListener('keydown', onEscKeydown);
};


const renderCard = (cardsContainer, card) => {
  const cardElement = new Card(card);
  const cardPoster = cardElement.getElement().querySelector('.film-card__poster');
  const cardTitle = cardElement.getElement().querySelector('.film-card__title');
  const commentsCountCard = cardElement.getElement().querySelector('.film-card__comments');

  cardPoster.style.cursor = 'pointer';

  render(cardsContainer, cardElement.getElement(), renderPosition.BEFOREEND);

  cardPoster.addEventListener('click', onFilmCardClick);
  cardTitle.addEventListener('click', onFilmCardClick);
  commentsCountCard.addEventListener('click', onFilmCardClick);
};

render(headerElement, new UserRunk().getElement(), renderPosition.BEFOREEND);
render(mainElement, new Menu(movieCards).getElement(), renderPosition.BEFOREEND);


if (MoviesContainer === 0) {
  render(mainElement, new NoMovies().getElement(), renderPosition.BEFOREEND);
} else {
  render(mainElement, new Sorting().getElement(), renderPosition.BEFOREEND);
  render(mainElement, new MoviesContainer().getElement(), renderPosition.BEFOREEND);

  const filmsContainer = mainElement.querySelector('.films');
  const filmsList = filmsContainer.querySelector('.films-list');
  const filmsListContainer = filmsList.querySelector('.films-list__container');
  const topratedMovies = filmsContainer.querySelector('.films-list--toprated');
  const topratedMoviesContainer = topratedMovies.querySelector('.films-list__container');
  const mostСommentedFilms = filmsContainer.querySelector('.films-list--most-commented');
  const mostСommentedFilmsContainer = mostСommentedFilms.querySelector('.films-list__container');

  filmsContainer.addEventListener('click', (evt) => {
    if (evt.target.className === 'film-card__poster') {
      onFilmCardClick();
    }
  });

  for (let i = 0; i < MOVIE_CARDS_COUNT; i++) {
    renderCard(filmsListContainer, movieCards[i]);
  }

  for (let i = 0; i < TOPRATED_MOVIES; i++) {
    renderCard(topratedMoviesContainer, movieCards[i]);
  }

  for (let i = 0; i < MOST_COMMENTED_FILMS; i++) {
    renderCard(mostСommentedFilmsContainer, movieCards[i]);
  }

  if (movieCards.length > MOVIE_CARDS_COUNT) {
    const showMoreButton = filmsList.querySelector('.films-list__show-more');
    let cardCount = MOVIE_CARDS_COUNT;

    render(filmsList, new Button().getElement(), renderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      movieCards
        .slice(cardCount, cardCount + MOVIE_CARDS_COUNT)
        .forEach((card) => renderCard(filmsListContainer, card));
      cardCount += MOVIE_CARDS_COUNT;

      if (cardCount >= movieCards.length) {
        showMoreButton.remove();
      }
    });
  }

}
