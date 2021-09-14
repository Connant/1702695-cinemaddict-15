import Page from './presenter/movie-page.js';
import UserRunk from './view/user-rank';
import Statistic from './view/stats.js';
import FilterNav from './presenter/filters-navigation.js';
import MoviesModel from './model/movies.js';
import CommentsModel from './model/comments.js';
import PageModel from './model/filters.js';

import { render, remove, renderPosition } from './utils/utils.js';
import { generateMovieCard } from './mock/fake-card.js';
import { COUNT, Pages } from './constants.js';


const films = new Array(COUNT).fill().map((item, index) => generateMovieCard(index));
export const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const idComments = films.map((film) => film.comments).flat();

const filmsModel = new MoviesModel();
const commentsModel = new CommentsModel();

commentsModel.setComments(idComments);
filmsModel.setFilms(films);

const pageModel = new PageModel();
const pagePresenter = new Page(mainElement, filmsModel, commentsModel, pageModel);

const filterPresenter = new FilterNav(mainElement, pageModel, filmsModel, handleMenuClick);
render(headerElement, new UserRunk().getElement(), renderPosition.BEFOREEND);
filterPresenter.init();
const statisticElement = new Statistic();
pagePresenter.init();

function handleMenuClick(filterType) {
  if (filterType === Pages.STATISTIC) {
    render(mainElement, statisticElement, renderPosition.BEFOREEND);
    statisticElement.init(filmsModel);
    pagePresenter.hide();
    statisticElement.setData();
    return;
  }
  pagePresenter.show();
  remove(statisticElement);
}

