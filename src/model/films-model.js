import {FILM_CARDS_AMOUNT} from '../constants.js';
import {
  getFilmData,
  getComment,
} from '../temp-data/temp.js';

export default class FilmsModel {
  #films = Array.from({length:  FILM_CARDS_AMOUNT}, getFilmData);
  #comments = Array.from({length:  FILM_CARDS_AMOUNT}, getComment);

  get films () {
    return this.#films;
  }

  get comments () {
    return this.#comments;
  }
}
