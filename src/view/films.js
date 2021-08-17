import { createElement } from '../mock/utilts.js';

export const filmsSectionTemplate = () => (
  `<section class="films">
  </section>`
);

export default class FilmSection {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return filmsSectionTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
