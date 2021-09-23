import Menu from '../view/menu.js';
import { render, renderPosition, remove, replace } from '../utils/render.js';
import { filter } from '../utils/filters.js';
import { Pages, UpdateType } from '../constants.js';

export default class FilterNavigation {
  constructor(filterContainer, pageModel, moviesModel, handleStatistic) {
    this._filterContainer = filterContainer;
    this._pageModel = pageModel;
    this._moviesModel = moviesModel;
    this._handleStatistic = handleStatistic;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.subscribe(this._handleModelEvent);
    this._pageModel.subscribe(this._handleModelEvent);
  }

  init() {
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new Menu(this._getFilters(), this._pageModel.getActivePage());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, renderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (filterType === Pages.STATISTIC) {
      this._pageModel.setActivePage(null, filterType);
      this._handleStatistic(filterType);
      return;
    }
    this._pageModel.setActivePage(UpdateType.MAJOR, filterType);
    this._handleStatistic(filterType);
  }

  _getFilters() {
    const films = this._moviesModel.getFilms();
    return [
      {
        type: Pages.ALL,
        name: 'All movies',
        count: filter[Pages.ALL](films).length,
      },
      {
        type: Pages.WATCHLIST,
        name: 'Watchlist',
        count: filter[Pages.WATCHLIST](films).length,
      },
      {
        type: Pages.HISTORY,
        name: 'History',
        count: filter[Pages.HISTORY](films).length,
      },
      {
        type: Pages.FAVORITES,
        name: 'Favorites',
        count: filter[Pages.FAVORITES](films).length,
      },
    ];
  }
}
