import {render} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';

export default class FilmCardPresenter {
  #film = null;
  #comment = null;
  #filmContainerComponent = null;
  #filmCardView = null;

  constructor(film, comment, filmContainerComponent) {
    this.#film = film;
    this.#comment = comment;
    this.#filmContainerComponent = filmContainerComponent;
    this.#filmCardView = new FilmCardView(this.#film, this.#comment);
  }

  renderFilmCard = () => render(this.#filmCardView, this.#filmContainerComponent);
}
