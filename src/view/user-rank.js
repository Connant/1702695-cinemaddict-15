import Abstract from './abstract.js';

const userRunkTemplate = (films) => {

  const getProfileRating = (elements) => {
    if (elements >= 1 && elements < 10) {
      return 'Novice';
    }
    if (elements >= 10 && elements < 20) {
      return 'Fan';
    }
    if (elements >= 21) {
      return 'Movie-Buff';
    }
    if (elements === 0) {
      return '';
    }
  };

  const watchedFilms = films.filter((film) => film.userDetails.alreadyWatched === true);

  return `<section class="header__profile profile">
    <p class="profile__rating">${getProfileRating(watchedFilms.length)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
export default class UserRunk extends Abstract {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return userRunkTemplate(this._films);
  }
}
