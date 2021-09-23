import Page from './presenter/page.js';
import Statistic from './view/statistic.js';
import FilterNavigation from './presenter/filter-navigation.js';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import PageModel from './model/page-model.js';
import Api from './api.js';

import { render, renderPosition, remove } from './utils/render.js';
import { Pages, UpdateType } from './constants.js';


const AUTHORIZATION = 'Basic 1r0nman1onys1ar';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const api = new Api(END_POINT, AUTHORIZATION);

export const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const filmsModel = new MoviesModel();
const commentsModel = new CommentsModel();
const pageModel = new PageModel();
const statisticElement = new Statistic();

const pagePresenter = new Page(mainElement, filmsModel, commentsModel, pageModel, api, headerElement);

const handleMenuClick = (filterType) => {
  if (filterType === Pages.STATISTIC) {
    render(mainElement, statisticElement, renderPosition.BEFOREEND);
    statisticElement.init(filmsModel);
    pagePresenter.hide();
    statisticElement.setData();
    return;
  }
  pagePresenter.show();
  remove(statisticElement);
};

const filterPresenter = new FilterNavigation(mainElement, pageModel, filmsModel, handleMenuClick);

filterPresenter.init();
pagePresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

