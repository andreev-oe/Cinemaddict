import FilmPopupView from '../view/film-popup-view.js';
import {remove, render, replace} from '../framework/render.js';
import {updateFilm} from '../utils/utilities.js';

export default class PopupPresenter {
  #filmPopup = null;
  #films = null;
  #comments = null;
  #mainContainer = null;
  #popupPresenter = null;
  #evt = null;

  constructor(filmsModel, mainContainer) {
    this.#films = [...filmsModel.films];
    this.#comments = [...filmsModel.comments];
    this.#mainContainer = mainContainer;
    this.#filmPopup = null;
    this.#popupPresenter = new Map();
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      document.body.classList.remove('hide-overflow');
      document.body.removeEventListener('keydown', this.#onEscKeyDown);
      this.#filmPopup.element.remove();
      this.#filmPopup.removeElement();
      this.destroy();
    }
  };

  #onClosePopupButtonClick = () => {
    document.body.classList.remove('hide-overflow');
    document.body.removeEventListener('keydown', this.#onEscKeyDown);
    this.#filmPopup.element.remove();
    this.#filmPopup.removeElement();
    this.destroy();
  };

  onFilmImgClick = (evt) => {
    if (evt.target.nodeName === 'IMG' && evt.target.dataset.filmId){
      if (this.#filmPopup) {
        this.#filmPopup.element.remove();
        this.#filmPopup.removeElement();
      }
      this.renderPopup(evt);
    }
  };

  #updatePopup = (popupToUpdate) => {
    this.#films = updateFilm(this.#films, popupToUpdate);
    this.renderPopup(this.#evt);
  };

  renderPopup = (evt) => {
    this.#evt = evt;
    const prevPopupView = this.#filmPopup;
    this.#filmPopup = new FilmPopupView(this.#films[evt.target.dataset.filmId], this.#comments);
    document.body.classList.add('hide-overflow');
    document.body.addEventListener('keydown', this.#onEscKeyDown);
    this.#filmPopup = new FilmPopupView(this.#films[evt.target.dataset.filmId], this.#comments);
    this.#filmPopup.setOnClosePopupButtonClick(this.#onClosePopupButtonClick);
    if (prevPopupView === null) {
      render(this.#filmPopup, this.#mainContainer);
      this.#filmPopup.setOnAddToFavoritesButtonClick(this.#updatePopup, this.#onAddToFavoritesButtonClick);
      this.#filmPopup.setOnAddToWatchButtonClick(this.#updatePopup, this.#onAddToWatchedButtonClick);
      this.#filmPopup.setOnAddToWatchedButtonClick(this.#updatePopup, this.#onAddToWatchButtonClick);
      return;
    }
    if (this.#mainContainer.contains(prevPopupView.element)) {
      replace(this.#filmPopup, prevPopupView);
      this.#filmPopup.setOnAddToFavoritesButtonClick(this.#updatePopup, this.#onAddToFavoritesButtonClick);
      this.#filmPopup.setOnAddToWatchButtonClick(this.#updatePopup, this.#onAddToWatchedButtonClick);
      this.#filmPopup.setOnAddToWatchedButtonClick(this.#updatePopup, this.#onAddToWatchButtonClick);
    }
    prevPopupView.element.remove();
    prevPopupView.removeElement();
    remove(prevPopupView);
  };

  #onAddToFavoritesButtonClick = (film) => {
    film.userDetails.favorite = !film.userDetails.favorite;
  };

  #onAddToWatchedButtonClick = (film) => {
    film.userDetails.alreadyWatched = !film.userDetails.alreadyWatched;
  };

  #onAddToWatchButtonClick = (film) => {
    film.userDetails.watchlist = !film.userDetails.watchlist;
  };

  destroy = () => remove(this.#filmPopup);
}
