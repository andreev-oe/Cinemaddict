import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{
  #comments = [];
  #commentsApiService = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments () {
    return this.#comments;
  }

  addComment = async (updateType, commentData, filmData) => {
    try {
      const response = await this.#commentsApiService.addComment(filmData, commentData);
      const updatedFilm = this.#commentsApiService.adaptFilmToClient(response.movie);
      this.#comments = response.comments;
      this._notify(updateType, updatedFilm);
    } catch(err) {
      this.#comments = [];
    }
  };

  deleteComment = async (updateType, commentData) => {
    const index = this.#comments.findIndex((comment) => comment.id === commentData.id);
    try {
      await this.#commentsApiService.deleteComment(commentData);
      if (index === -1) {
        throw new Error('comment does not exist');
      }
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
      this._notify(updateType, commentData);
    } catch (e) {
      this.#comments = [];
    }
  };

  init = async (updateType, film) => {
    try {
      const comments = await this.#commentsApiService.comments(film);
      this.#comments = this.#commentsApiService.adaptCommentToClient(comments);
    } catch(err) {
      this.#comments = [];
    }
    this._notify(updateType, film);
  };
}
