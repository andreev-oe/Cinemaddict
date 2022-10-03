import FilmCardView from '../view/film-card-view.js';
import {
  remove,
  render,
  replace
} from '../framework/render.js';
import {UpdateType, UserAction} from '../constants.js';

export default class FilmCardPresenter {
  #film = null;
  #comment = null;
  #filmContainerComponent = null;
  #filmCardView = null;
  #changeData;

  constructor(film, comment, filmContainerComponent, changeData) {
    this.#film = film;
    this.#comment = comment;
    this.#filmContainerComponent = filmContainerComponent;
    this.#changeData = changeData;
  }

  get filmCardView () {
    return this.#filmCardView;
  }

  #onAddToFavoritesButtonClick = (film) => {
    film.userDetails.favorite = !film.userDetails.favorite;
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      film,
    );
  };

  #onAddToWatchedButtonClick = (film) => {
    film.userDetails.watchlist = !film.userDetails.watchlist;
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      film,
    );
  };

  #onAddToWatchButtonClick = (film) => {
    film.userDetails.alreadyWatched = !film.userDetails.alreadyWatched;
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      film,
    );
  };

  renderFilmCard = (filmToUpdate = this.#film) => {
    const prevFilmCardView = this.#filmCardView;
    this.#filmCardView = new FilmCardView(filmToUpdate, this.#comment);
    if (prevFilmCardView === null) {
      render(this.#filmCardView, this.#filmContainerComponent);
      this.#filmCardView.setOnAddToFavoritesButtonClick(this.#onAddToFavoritesButtonClick);
      this.#filmCardView.setOnAddToWatchButtonClick(this.#onAddToWatchedButtonClick);
      this.#filmCardView.setOnAddToWatchedButtonClick(this.#onAddToWatchButtonClick);
      return;
    }
    if (this.#filmContainerComponent.contains(prevFilmCardView.element)) {
      replace(this.#filmCardView, prevFilmCardView);
      this.#filmCardView.setOnAddToFavoritesButtonClick(this.#onAddToFavoritesButtonClick);
      this.#filmCardView.setOnAddToWatchButtonClick(this.#onAddToWatchedButtonClick);
      this.#filmCardView.setOnAddToWatchedButtonClick(this.#onAddToWatchButtonClick);
    }
    remove(prevFilmCardView);
  };

  destroy = () => remove(this.#filmCardView);
}
