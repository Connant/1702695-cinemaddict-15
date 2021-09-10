// import { render, renderPosition } from './utils/utils.js';
// import Page from './presenter/movie-page.js';
// import UserRunk from './view/user-rank';
// import { generateMovieCard  } from './mock/fake-card.js';
// import { COUNT } from './constants.js';


// const films = new Array(COUNT).fill().map((item, index) => generateMovieCard(index));
// const headerElement = document.querySelector('.header');
// const mainElement = document.querySelector('.main');
// const pagePresenter = new Page(mainElement);


// render(headerElement, new UserRunk().getElement(), renderPosition.BEFOREEND);
// pagePresenter.init(films);


import { render, renderPosition } from './utils/utils.js';
import Page from './presenter/movie-page.js';
import UserRunk from './view/user-rank';
import { generateMovieCard } from './mock/fake-card.js';
import { COUNT } from './constants.js';

import FilterNav from './presenter/filters-navigation.js';
import MoviesModel from './model/movies.js';
import CommentsModel from './model/comments.js';
import PageModel from './model/filters.js';
import { generateComment } from './mock/fake-card.js';

const films = new Array(COUNT).fill().map((item, index) => generateMovieCard(index));
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const idComments = films.map((film) => film.comments).flat();
const commentsArray = [];
idComments.forEach((id) => commentsArray.push(generateComment(id)));

const filmsModel = new MoviesModel();
const commentsModel = new CommentsModel();
commentsModel.setComments(commentsArray);
filmsModel.setFilms(films);

const pageModel = new PageModel();

const pagePresenter = new Page(mainElement, filmsModel, commentsModel);
const filterPresenter = new FilterNav(mainElement, pageModel, filmsModel);
// const filterPresenter = new FilterNav();

render(headerElement, new UserRunk().getElement(), renderPosition.BEFOREEND);

filterPresenter.init();
pagePresenter.init();
