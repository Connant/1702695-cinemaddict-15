import { formatReleaseDate, formatRuntime } from '../mock/utilts.js';
// import { generateMovieCard } from '../mock/fake-card.js';

export const popupTemplate = (movie) => {

  // const xxxName = {
  //   if('class-class') {
  //     return '';
  //   }
  // } ???

  // const genre =  {
  //   if('length === 1') {
  //     return genre;
  //   } else {
  //     return genres;
  //   }
  // }

  const watchlistName = movie.userDetails.watchlist ? 'film-details__control-button--active' : '';
  const watchedName = movie.userDetails.alreadyWatched ? 'film-details__control-button--active' : '';
  const favoritesName = movie.userDetails.favorite ? 'film-details__control-button--active' : '';
  const isGenres = movie.filmInfo.genres.length === 1 ? 'Genre' : 'Genres';


  return `<section class="film-details">
<form class="film-details__inner" action="" method="get">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src=${movie.filmInfo.poster} alt="">
        <p class="film-details__age">${movie.filmInfo.ageRating}+</p>
      </div>
      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${movie.filmInfo.title}</h3>
            <p class="film-details__title-original">Original: ${movie.filmInfo.alternativeTitle}</p>
          </div>
          <div class="film-details__rating">
            <p class="film-details__total-rating">${movie.filmInfo.totalRating}</p>
          </div>
        </div>
        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${movie.filmInfo.director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${movie.filmInfo.writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${movie.filmInfo.actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${formatReleaseDate(movie.filmInfo.release.date)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${formatRuntime(movie.filmInfo.runTime)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${movie.filmInfo.release.releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${isGenres}</td>
            <td class="film-details__cell" style="font-size:0">
            ${movie.filmInfo.genres.map((genre) => `<span class="film-details__genre" style="font-size:21px">${genre}</span>`)}
            </td>
          </tr>
        </table>
        <p class="film-details__film-description">${movie.filmInfo.description}</p>
      </div>
    </div>
    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistName}" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${watchedName}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoritesName}" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>
  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${movie.comments.length}</span></h3>
      <ul class="film-details__comments-list" style="font-size:0" >
      ${movie.comments.map((comment) =>
    ` <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src=${comment.emoji} width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info" >
            <span class="film-details__comment-author">${comment.avtor}</span>
            <span class="film-details__comment-day">${comment.dueDate}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`)}
      </ul>
      <div class="film-details__new-comment">
      <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label"></div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>
      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
    </section>
  </div>
</form>
</section>`;
};
