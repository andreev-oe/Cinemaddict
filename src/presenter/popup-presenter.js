import FilmPopupView from '../view/film-popup-view.js';
import {render} from '../framework/render.js';

export default class PopupPresenter {
  #filmPopup = null;
  #films = null;
  #comments = null;
  #mainContainer = null;

  constructor(filmsModel, mainContainer) {
    this.#films = [...filmsModel.films];
    this.#comments = [...filmsModel.comments];
    this.#mainContainer = mainContainer;
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      document.body.classList.remove('hide-overflow');
      document.body.removeEventListener('keydown', this.#onEscKeyDown);
      this.#filmPopup.element.remove();
      this.#filmPopup.removeElement();
    }
  };

  #onClosePopupButtonClick = () => {
    document.body.classList.remove('hide-overflow');
    document.body.removeEventListener('keydown', this.#onEscKeyDown);
    this.#filmPopup.element.remove();
    this.#filmPopup.removeElement();
  };

  onFilmImgClick = (evt) => {
    if (evt.target.nodeName === 'IMG' && evt.target.dataset.filmId){
      if (this.#filmPopup) {
        this.#filmPopup.element.remove();
        this.#filmPopup.removeElement();
      }
      document.body.classList.add('hide-overflow');
      document.body.addEventListener('keydown', this.#onEscKeyDown);
      this.#filmPopup = new FilmPopupView(this.#films[evt.target.dataset.filmId], this.#comments);
      this.#filmPopup.setClosePopupButtonHandler(this.#onClosePopupButtonClick);
      render(this.#filmPopup, this.#mainContainer);
    }
  };
}
