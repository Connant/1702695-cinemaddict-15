import { formatRuntime } from '../mock/utilts.js';
// import { movieInfo }from '../mock/fake-card.js';

export const createMovieCardTemplate = (card) => {
  const { movieInfo } = card;

  const runtimeMovie = formatRuntime(movieInfo.runtime);

  // const setCardControlsItemActive = (value) => {
  //   if (value === 'film-card__controls-item--active') {
  //   }
  // };

  const setCardControlsItemActive = (value) => value ? 'film-card__controls-item--active' : '';

  const watchlistClassActive = setCardControlsItemActive(movieInfo.userDetails.watchlist);

  const alreadyWatchedClassActive = setCardControlsItemActive(movieInfo.userDetails.alreadyWatched);

  const favoriteClassActive = setCardControlsItemActive(movieInfo.userDetails.favorite);

  return `<article class="film-card">
     <h3 class="film-card__title">${movieInfo.title}</h3>
     <p class="film-card__rating">${movieInfo.totalRating}</p>
     <p class="film-card__info">
       <span class="film-card__year">${movieInfo.year}</span>
       <span class="film-card__duration">${runtimeMovie}</span>
       <span class="film-card__genre">${movieInfo.genre}</span>
     </p>
     <img src="${movieInfo.poster}" alt="" class="film-card__poster">
     <p class="film-card__description">${movieInfo.description}</p>
     <a class="film-card__comments">${movieInfo.commentsCount} comments</a>
     <div class="film-card__controls">
       <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassActive}" type="button">Add to watchlist</button>
       <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassActive}" type="button">Mark as watched</button>
       <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassActive}" type="button">Mark as favorite</button>
     </div>
   </article>`;
};


// export const createMovieCardTemplate = () => (
//   `<article class="film-card">
//   <h3 class="film-card__title">The Great Flamarion</h3>
//   <p class="film-card__rating">8.9</p>
//   <p class="film-card__info">
//     <span class="film-card__year">1945</span>
//     <span class="film-card__duration">1h 18m</span>
//     <span class="film-card__genre">Mystery</span>
//   </p>
//   <img src="./images/posters/the-great-flamarion.jpg" alt="" class="film-card__poster">
//   <p class="film-card__description">The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…</p>
//   <a class="film-card__comments">12 comments</a>
//   <div class="film-card__controls">
//     <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
//     <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
//     <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
//   </div>
// </article>`
// );
