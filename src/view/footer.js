import Abstract from './abstract';

const createNumbersFilms = (films) => (
  `<p>${films.length} movies inside</p>`
);

export default class NumbersFilms extends Abstract {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createNumbersFilms(this._films);
  }
}
