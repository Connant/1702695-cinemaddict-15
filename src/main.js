import Page from './presenter/movie-page.js';
import Statistic from './view/stats.js';
import FilterNav from './presenter/filters-navigation.js';
import MoviesModel from './model/movies.js';
import CommentsModel from './model/comments.js';
import PageModel from './model/filters.js';
import Api from './api.js';

import { render, remove, renderPosition } from './utils/utils.js';
import { Pages, UpdateType } from './constants.js';


const AUTHORIZATION = 'Basic 1r0nman1onys1ar';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const api = new Api(END_POINT, AUTHORIZATION);

export const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const filmsModel = new MoviesModel();
const commentsModel = new CommentsModel();
const pageModel = new PageModel();

const pagePresenter = new Page(mainElement, filmsModel, commentsModel, pageModel, api, headerElement);
const filterPresenter = new FilterNav(mainElement, pageModel, filmsModel, handleMenuClick);


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

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

