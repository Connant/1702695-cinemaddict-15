import Abstract from '../mock/abstract.js';

export const showMoreButtonTemplate = () => (
  `
  <button class="films-list__show-more">Show more</button>`
);


export default class Button extends Abstract {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return showMoreButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
