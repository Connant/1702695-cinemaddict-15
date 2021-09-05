import { formatReleaseDate, formatRuntime } from '../utils/utilts.js';
import SmartView from './smart.js';

const createCommentTemplate = (comment) => (
  ` <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src=${comment.emoji} width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${comment.comment}</p>
            <p class="film-details__comment-info" >
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${comment.date}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`
);

const createCommentsTemplate = (comments) => (
  `<ul class="film-details__comments-list" style="font-size:0" >
  ${comments.map((comment) => createCommentTemplate(comment))}
  </ul>`
);

const createEmojiTemplate = (generateComment) => (
  ` <img src=${generateComment.emoji} width="55" height="55" alt="emoji-smile">`
);


const createNewCommentTemplate = (generateComment) => (
  ` <div class="film-details__new-comment">
  <div class="film-details__add-emoji-label">${generateComment.emoji ? createEmojiTemplate(generateComment) : ''}</div>
  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${generateComment.comment ? generateComment.comment : ''}</textarea>
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
    </label>
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
    <label class="film-details__emoji-label" for="emoji-angry">
      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
    </label>
  </div>`
);


const createPopupTemplate = (data, newComment) => {
  const { comments, movieInfo, userDetails } = data;

  const watchlistName = userDetails.watchlist ? 'film-details__control-button--active' : '';
  const watchedName = userDetails.alreadyWatched ? 'film-details__control-button--active' : '';
  const favoritesName = userDetails.favorite ? 'film-details__control-button--active' : '';
  const isGenres = movieInfo.genre.length === 1 ? 'Genre' : 'Genres';

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${movieInfo.poster} alt="">
          <p class="film-details__age">${movieInfo.ageRating}+</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${movieInfo.title}</h3>
              <p class="film-details__title-original">Original: ${movieInfo.alternativeTitle}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${movieInfo.rating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${movieInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${movieInfo.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${movieInfo.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatReleaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatRuntime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${movieInfo.release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${isGenres}</td>
              <td class="film-details__cell" style="font-size:0">
              </td>
            </tr>
          </table>
          <p class="film-details__film-description">${movieInfo.description}</p>
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
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      ${comments ? createCommentsTemplate(comments) : ''}
      ${createNewCommentTemplate(newComment)}
      </section>
    </div>
  </form>
</section>`;
};

export default class Popup extends SmartView {
  constructor(film, changeData) {
    super();
    this._data = Popup.parseFilmToData(film);
    this._changeData = changeData;
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._textInputHandler = this._textInputHandler.bind(this);
    this._emojiHandler = this._emojiHandler.bind(this);
    this._sendCommentHandler = this._sendCommentHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._data, this._newComment);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._alreadyWatchedClickHandler);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
  }


  static parseFilmToData(film) {
    return Object.assign(
      {},
      film,
      {
        scrollPosition: null,
        isComments: film.comments.length !== 0,
      },
    );
  }


  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    if (!data.isComments) {
      data.comments = [];
    }
    if (data.scrollPosition) {
      delete data.scrollPosition;
    }
    delete data.isComments;

    return data;
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._emojiHandler);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._textInputHandler);
    document.addEventListener('keydown', this._sendCommentHandler);
  }

  _textInputHandler(evt) {
    evt.preventDefault();

    this._data = Object.assign(
      {},
      this._data,
      {
        isComments: this._data.comments.length !== 0,
        scrollPosition: this.getElement().scrollTop,
      },
    );

    this.updateNewComment(
      Object.assign(
        {},
        this._newComment,
        {
          text: evt.target.value,
        },
      ), true);
    this.getElement().scrollTop = this._data.scrollPosition;
  }


  _emojiHandler(evt) {
    evt.preventDefault();

    this._data = Object.assign(
      {},
      this._data,
      {
        isComments: this._data.comments.length !== 0,
        scrollPosition: this.getElement().scrollTop,
      },
    );

    this.updateNewComment(
      Object.assign(
        {},
        this._newComment,
        {
          emoji: `images/emoji/${evt.target.value}.png`,
        },
      ));
  }

  _sendCommentHandler(evt) {
    if (evt.ctrlKey && evt.key === 'Enter') {
      evt.preventDefault();

      if (this._newComment.emoji || this._newComment.text) {
        this._addingNewCooment();
        this.updateData(
          Object.assign(
            {},
            this._data,
            {
              isComments: this._data.comments.length !== 0,
            },
          ),
        );
        this._data = Popup.parseDataToFilm(this._data);
      }
    }
  }

  _addingNewCooment() {
    this._newComment = Object.assign(
      {},
      this._newComment,
      {
        id: 1,
        author: 'Name',
        dueDate: `${formatReleaseDate} ${formatRuntime}`,
      });

    const comments = this._data.comments;
    const newcomment = this._newComment;

    comments[comments.length] = newcomment;
    this._data = Object.assign(
      {},
      this._data,
      {
        comments: comments,
      },
    );
    this._newComment = {};
    this._changeData(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClickHandler(this._callback.click);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }
}
