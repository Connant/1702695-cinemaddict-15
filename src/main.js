import { render, renderPosition } from './utils/utilts.js';
import Page from './presenter/movie-page.js';
import UserRunk from './view/user-rank';
import { generateMovieCard  } from './mock/fake-card.js';
import { COUNT } from './constants.js';


const films = new Array(COUNT).fill().map((item, index) => generateMovieCard(index));
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const pagePresenter = new Page(mainElement);


render(headerElement, new UserRunk().getElement(), renderPosition.BEFOREEND);
pagePresenter.init(films);
