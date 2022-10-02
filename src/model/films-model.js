import Observable from '../framework/observable.js';

export default class FilmsModel extends Observable{
  #filmsApiService = null;
  #films = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

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

  init = async (updateType) => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#filmsApiService.adaptToClient);
    } catch(err) {
      this.#films = [];
    }
    this._notify(updateType);
  };
}
