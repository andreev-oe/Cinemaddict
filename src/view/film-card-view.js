import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {MAX_DESCRIPTION_LENGTH} from '../constants.js';
dayjs.extend(duration);

const sliceDescription = (description) => {
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
  }
};

const createFilmCardElement = (film) => {
  const {title, description, release, poster, genre, runtime, totalRating} = film.filmInfo;
  const {favorite, alreadyWatched, watchlist} = film.userDetails;
  const {length} = film.comments;
  return `<article class="film-card" data-film-id="${film.id}">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${dayjs(release.date).format('DD MMMM YYYY')}</span>
              <span class="film-card__duration">${dayjs.duration(runtime, 'minutes').format('H[h] : mm[m]')}</span>
              <span class="film-card__genre">${genre[0]}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster" data-film-id="${film.id}">
            <p class="film-card__description">${sliceDescription(description)}</p>
            <span class="film-card__comments">${length} comments</span>
          </a>
          <div class="film-card__controls" data-film-id="${film.id}">
            <button data-button="watchlist" class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist === true ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button data-button="watched" class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched === true ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button data-button="favourite" class="film-card__controls-item film-card__controls-item--favorite ${favorite === true ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template () {
    return createFilmCardElement(this.#film);
  }

  setOnAddToFavoritesButtonClick = (eventListener) => {
    this._callback.onFavoriteClick = eventListener;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#onAddToFavoritesButtonClick);
  };

  #onAddToFavoritesButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.onFavoriteClick(this.#film);
  };

  setOnAddToWatchedButtonClick = (eventListener) => {
    this._callback.onWatchedClick = eventListener;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#onAddToWatchedButtonClick);
  };

  #onAddToWatchedButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.onWatchedClick(this.#film);
  };

  setOnAddToWatchButtonClick = (eventListener) => {
    this._callback.onWatchClick = eventListener;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#onAddToWatchButtonClick);
  };

  #onAddToWatchButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.onWatchClick(this.#film);
  };
}
