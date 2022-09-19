import {FILM_CARDS_AMOUNT} from '../constants.js';
import {getComment} from '../temp-data/temp.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{
  #comments = Array.from({length:  FILM_CARDS_AMOUNT}, getComment);

  get comments () {
    return this.#comments;
  }

  add (updateType, update) {
    this.#comments.push(update);
    this._notify(updateType, update);
  }

  delete (updateType, update) {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);
    if (index === -1) {
      throw new Error('comment does not exist');
    }
    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];
    this._notify(updateType, update);
  }
}
