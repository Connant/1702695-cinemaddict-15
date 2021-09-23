import Abstract from './abstract';

const createTotalMoviesCount = (films) => (
  `<p>${films.length} movies inside</p>`
);

export default class TotalMoviesCount extends Abstract {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createTotalMoviesCount(this._films);
  }
}
