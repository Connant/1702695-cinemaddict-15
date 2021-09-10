import AbstractObserver from './abstract-observer';

export default class CommentsModel extends AbstractObserver {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update, comments, scroll) {
    this._comments = [
      ...this._comments,
      comments,
    ];

    this._notify(updateType, update, this._comments, scroll);
  }

  deleteComment(updateType, update, comments, scroll) {
    const index = this._comments.findIndex((comment) => comment.id === comments.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this._notify(updateType, update, this._comments, scroll);
  }
}
