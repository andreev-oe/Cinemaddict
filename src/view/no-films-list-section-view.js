import AbstractView from '../framework/view/abstract-view.js';

const createNoFilmListSectionElement = () => `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>`;

export default class NoFilmsListSectionView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template () {
    return createNoFilmListSectionElement(this.#film);
  }
}
