import AbstractObserver from './abstract-observer';
import { Pages } from '../constants.js';

export default class PageModel extends AbstractObserver {
  constructor() {
    super();
    this._activePage = Pages.ALL;
  }

  setActivePage(updateType, page) {
    this._activePage = page;
    this._notify(updateType, this._activePage);
  }

  getActivePage() {
    return this._activePage;
  }
}
