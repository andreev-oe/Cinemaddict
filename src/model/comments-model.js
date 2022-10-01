import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{
  #comments = [];
  #filmComments = null;

  getAllComments () {
    return this.#comments;
  }

  getFilmComments (film) {
    this.#filmComments = film.comments.map((commentId) => {
      this.#comments.find((comment) => comment.id === commentId);
    });
    return this.#filmComments;
  }

  addComment (updateType, commentData) {
    this.#comments.push(commentData);
    this._notify(updateType, commentData);
  }

  deleteComment (updateType, commentData) {
    const index = this.#comments.findIndex((comment) => comment.id === commentData.id);
    if (index === -1) {
      throw new Error('comment does not exist');
    }
    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];
    this._notify(updateType, commentData);
  }
}
