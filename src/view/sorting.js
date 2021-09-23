import Abstract from './abstract.js';
import { SortType } from '../constants.js';

const createSortTemplate = (newSorting) => {
  let classDate = '';
  let classRating = '';
  let classDefault = '';

  switch (newSorting) {
    case SortType.DATE:
      classDate = 'sort__button--active';
      break;
    case SortType.RATING:
      classRating = 'sort__button--active';
      break;
    case SortType.DEFAULT:
      classDefault = 'sort__button--active';
      break;
  }

  return `<ul class="sort">
    <li><a href="#" class="sort__button ${classDefault}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${classDate}" data-sort-type="${SortType.DATE}">Sort by date </a></li>
    <li><a href="#" class="sort__button ${classRating}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;
};

export default class Sorting extends Abstract {
  constructor(newSorting) {
    super();
    this._newSorting = newSorting;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._newSorting);
  }

  _sortTypeChangeHandler(evt) {

    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

