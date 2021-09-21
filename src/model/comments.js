import AbstractObserver from './abstract-observer';

export default class CommentsModel extends AbstractObserver {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(updateType, film, comments) {
    this._comments = this._comments.concat(comments);
    const filmPayload = Object.assign(
      {},
      film,
      {
        comments: comments,
      },
    );
    this._notify(updateType, filmPayload);
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

  deleteComment(updateType, update, film) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this._notify(updateType, film);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        comment: comment['comment'],
        emoji: comment['emotion'],
        date: comment['date'],
        author: comment['author'],
      });
    delete adaptedComment['emotion'];
    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        'comment': comment.comment,
        'author': comment.author,
        'emotion': comment.emoji,
        'date': comment.date,
      });
    delete adaptedComment.emoji;
    return adaptedComment;
  }

}
