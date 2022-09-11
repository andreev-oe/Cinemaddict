import FilmPopupView from '../view/film-popup-view.js';
import {
  remove,
  render
} from '../framework/render.js';
import {updateFilm} from '../utils/utilities.js';

export default class PopupPresenter {
  #filmPopup = null;
  #films = null;
  #comments = null;
  #mainContainer = null;
  #popupPresenter = null;
  #evt = null;
  #popupClosed = true;

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
      this.destroy();
      this.#popupClosed = true;
    }
  };

  #onClosePopupButtonClick = () => {
    document.body.classList.remove('hide-overflow');
    document.body.removeEventListener('keydown', this.#onEscKeyDown);
    this.destroy();
    this.#popupClosed = true;
  };

  onFilmImgClick = (evt) => {
    if (evt.target.nodeName === 'IMG' && evt.target.dataset.filmId){
      if (this.#filmPopup) {
        this.destroy();
      }
      this.renderPopup(evt);
      this.#popupClosed = false;
    }
  };

  get popupClosedState () {
    return this.#popupClosed;
  }

  updatePopup = (popupToUpdate) => {
    if (this.#filmPopup !== null) {
      this.#films = updateFilm(this.#films, popupToUpdate);
      this.renderPopup(this.#evt);
    }
  };

  renderPopup = (evt) => {
    this.#evt = evt;
    const prevPopupView = this.#filmPopup;
    this.#filmPopup = new FilmPopupView(this.#films[evt.target.dataset.filmId], this.#comments);
    this.#filmPopup.setOnAddToFavoritesButtonClick(this.#onAddToFavoritesButtonClick);
    this.#filmPopup.setOnAddToWatchButtonClick(this.#onAddToWatchedButtonClick);
    this.#filmPopup.setOnAddToWatchedButtonClick(this.#onAddToWatchButtonClick);
    this.#filmPopup.setOnEmojiClick(this.#onEmojiClick);
    document.body.addEventListener('keydown', this.#onEscKeyDown);
    this.#filmPopup.setOnClosePopupButtonClick(this.#onClosePopupButtonClick);
    if (prevPopupView === null) {
      document.body.classList.add('hide-overflow');
      render(this.#filmPopup, this.#mainContainer);
      return;
    }
    if (prevPopupView.element) {
      document.body.classList.add('hide-overflow');
      render(this.#filmPopup, this.#mainContainer);
    }
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

  #onEmojiClick = (evt, emojiInputs, setNewCommentEmoji) => {
    if (evt.target.dataset.emojiName) {
      for (const input of emojiInputs) {
        input.checked = input.id === evt.target.dataset.emojiName;
      }
      setNewCommentEmoji();
    }
  };

  destroy = () => remove(this.#filmPopup);
}
