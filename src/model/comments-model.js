import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{
  #comments = [];
  #commentsApiService = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  getAllComments () {
    return this.#comments;
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

  init = async (updateType, film) => {
    try {
      const comments = await this.#commentsApiService.comments(film);
      this.#comments = this.#commentsApiService.adaptToClient(comments);
    } catch(err) {
      this.#comments = [];
    }
    this._notify(updateType, film);
  };
}
