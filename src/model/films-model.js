import {FILM_CARDS_AMOUNT} from '../constants.js';
import {getFilmData} from '../temp-data/temp.js';
import Observable from '../framework/observable.js';

export default class FilmsModel extends Observable{
  #films = Array.from({length:  FILM_CARDS_AMOUNT}, getFilmData);

  getFilms () {
    return this.#films;
  }

  updateFilms (updateType, newFilmData) {
    this.#films.forEach((film) => {
      if(film.id === newFilmData.id) {
        film = newFilmData;
      }
    });
    this._notify(updateType, newFilmData);
  }
}
