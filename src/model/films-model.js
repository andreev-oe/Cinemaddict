import Observable from '../framework/observable.js';

export default class FilmsModel extends Observable{
  #filmsApiService = null;
  #commentsApiService = null;
  #films = [];

  constructor(filmsApiService, commentsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
    this.#commentsApiService = commentsApiService;
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
