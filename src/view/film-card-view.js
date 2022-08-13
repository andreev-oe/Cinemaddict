import {createElement} from '../render.js';

const createFilmCardElement = (film) => `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${film.filmInfo.title}</h3>
            <p class="film-card__rating">${film.filmInfo.totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${film.filmInfo.release.date}</span>
              <span class="film-card__duration">${film.filmInfo.runtime}</span>
              <span class="film-card__genre">${film.filmInfo.genre}</span>
            </p>
            <img src="${film.filmInfo.poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${film.filmInfo.description}</p>
            <span class="film-card__comments">${film.comments.length} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate () {
    return createFilmCardElement(this.film);
  }

  getElement () {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
