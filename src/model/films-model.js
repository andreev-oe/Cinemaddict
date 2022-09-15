import {FILM_CARDS_AMOUNT} from '../constants.js';
import {
  getFilmData,
  getComment,
} from '../temp-data/temp.js';
import Observable from '../framework/observable.js';

export default class FilmsModel extends Observable{
  #films = Array.from({length:  FILM_CARDS_AMOUNT}, getFilmData);
  #comments = Array.from({length:  FILM_CARDS_AMOUNT}, getComment);

  get films () {
    return this.#films;
  }

  get comments () {
    return this.#comments;
  }

  set films (newFilmData) {
    this.#films.forEach((film) => {
      if(film.id === newFilmData.id) {
        film = newFilmData;
      }
    });
  }

  set comments (newCommentData) {
    this.#comments.forEach((comment) => {
      if(comment.id === newCommentData.id) {
        comment = newCommentData;
      }
    });
  }
}
