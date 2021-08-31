import { render, renderPosition } from './utils/utilts.js';
import Page from './presenter/movie-page.js';
import UserRunk from './view/user-rank';
import { generateMovieCard  } from './mock/fake-card.js';


const COUNT = 15;
const films = new Array(COUNT).fill().map(generateMovieCard);
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const pagePresenter = new Page(mainElement);


render(headerElement, new UserRunk().getElement(), renderPosition.BEFOREEND);
pagePresenter.init(films);

