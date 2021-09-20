import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
    this._newComment = {};
  }


  updateNewComment(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._newComment = Object.assign(
      {},
      this._newComment,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }


  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    if (parent) { parent.replaceChild(newElement, prevElement);
      this.restoreHandlers();
    }

  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
