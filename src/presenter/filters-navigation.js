import Menu from '../view/menu.js';
import { render, renderPosition, replace, remove, filter } from '../utils/utils.js';
import { Pages, UpdateType } from '../constants.js';

export default class FilterNav {
  constructor(filterContainer, pageModel, filmsModel, handleStatistic) {
    this._filterContainer = filterContainer;
    this._pageModel = pageModel;
    this._filmsModel = filmsModel;
    this._handleStatistic = handleStatistic;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
    this._pageModel.subscribe(this._handleModelEvent);
  }

  init() {
    const prevFilterComponent = this._filterComponent;
    const filtersTmp = this._getFilters();
    this._filterComponent = new Menu(filtersTmp, this._pageModel.getActivePage());
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
    const films = this._filmsModel.getFilms();
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
