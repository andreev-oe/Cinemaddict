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

  updateFilm = async (updateType, newFilmData) => {
    const index = this.#films.findIndex((film) => film.id === newFilmData.id);
    try {
      const film = await this.#filmsApiService.updateFilms(newFilmData);
      const adaptedFilm = this.#filmsApiService.adaptToClient(film);
      this.#films = [
        ...this.#films.slice(0, index),
        adaptedFilm,
        ...this.#films.slice(index + 1),
      ];
    } catch(err) {
      this.#films = [];
    }
    this._notify(updateType, newFilmData);
  };

  init = async (updateType) => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map((film) => this.#filmsApiService.adaptToClient(film));
    } catch(err) {
      this.#films = [];
    }
    this._notify(updateType);
  };
}
