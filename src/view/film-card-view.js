import {createElement} from '../render.js';

const createFilmCardElement = (film) => {
  const {title, description, release, poster, genre, runtime, totalRating} = film.filmInfo;
  const {favorite, alreadyWatched, watchlist} = film.userDetails;
  const {length} = film.comments;
  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${release.date}</span>
              <span class="film-card__duration">${runtime}</span>
              <span class="film-card__genre">${genre[0]}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster" data-film-id="${film.id}">
            <p class="film-card__description">${description}</p>
            <span class="film-card__comments">${length} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist === true ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched === true ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${favorite === true ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template () {
    return createFilmCardElement(this.#film);
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
