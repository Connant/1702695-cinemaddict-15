import Abstract from './abstract.js';
import { Pages } from '../constants.js';

const menuTemplate = (filters, filterData) => {
  const allFilter = filters[0];
  const watchlistFilter = filters[1];
  const historyFilter = filters[2];
  const favoritesFilter = filters[3];

  return `<nav class="main-navigation">
    <div class="main-navigation__items">

    <a href="#all" type= ${allFilter.type} class="main-navigation__item
    ${allFilter.type === filterData ? 'main-navigation__item--active' : ''}">All movies</a>

    <a href="#watchlist" type=${watchlistFilter.type} class="main-navigation__item
    ${watchlistFilter.type === filterData ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${watchlistFilter.count}</span></a>

    <a href="#history" type= ${historyFilter.type} class="main-navigation__item
    ${historyFilter.type === filterData ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${historyFilter.count}</span></a>

    <a href="#favorites" type = ${favoritesFilter.type} class="main-navigation__item
    ${favoritesFilter.type === filterData ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${favoritesFilter.count}</span></a>

    </div>

    <a href="#stats" type = ${Pages.STATISTIC} class="main-navigation__additional
    ${filterData === Pages.STATISTIC ? 'main-navigation__item--active' : ''}">Stats</a>

    </nav>`;
};

export default class Menu extends Abstract {
  constructor(filters, filterData) {
    super();
    this._filters = filters;
    this._currentFilter = filterData;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return menuTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.type);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
