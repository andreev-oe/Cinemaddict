import {createElement} from '../render.js';

const createNoFilmListSectionElement = () => `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>`;

export default class NoFilmsListSectionView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template () {
    return createNoFilmListSectionElement(this.#film);
  }

  get element () {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
