import {remove, render, replace} from '../framework/render.js';
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
  }

  #onAddToFavoritesButtonClick = (film) => {
    film.userDetails.favorite = !film.userDetails.favorite;
  };

  #onAddToWatchedButtonClick = (film) => {
    film.userDetails.watchlist = !film.userDetails.watchlist;
  };

  #onAddToWatchButtonClick = (film) => {
    film.userDetails.alreadyWatched = !film.userDetails.alreadyWatched;
  };

  renderFilmCard = (callback, filmToUpdate = this.#film) => {
    const prevFilmCardView = this.#filmCardView;
    this.#filmCardView = new FilmCardView(filmToUpdate, this.#comment);
    if (prevFilmCardView === null) {
      render(this.#filmCardView, this.#filmContainerComponent);
      this.#filmCardView.setOnAddToFavoritesButtonClick(callback, this.#onAddToFavoritesButtonClick);
      this.#filmCardView.setOnAddToWatchButtonClick(callback, this.#onAddToWatchedButtonClick);
      this.#filmCardView.setOnAddToWatchedButtonClick(callback, this.#onAddToWatchButtonClick);
      return;
    }
    if (this.#filmContainerComponent.contains(prevFilmCardView.element)) {
      replace(this.#filmCardView, prevFilmCardView);
      this.#filmCardView.setOnAddToFavoritesButtonClick(callback, this.#onAddToFavoritesButtonClick);
      this.#filmCardView.setOnAddToWatchButtonClick(callback, this.#onAddToWatchedButtonClick);
      this.#filmCardView.setOnAddToWatchedButtonClick(callback, this.#onAddToWatchButtonClick);
    }
    remove(prevFilmCardView);
  };

  destroy = () => remove(this.#filmCardView);
}
