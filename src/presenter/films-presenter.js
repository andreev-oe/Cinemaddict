import {EXTRA_FILMS_CARDS_AMOUNT} from '../constants.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListExtraSectionView from '../view/films-list-extra-section-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsSortView from '../view/films-sort-view.js';
import NavigationView from '../view/navigation-view.js';
import ProfileView from '../view/profile-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import {render} from '../render.js';

export default class FilmsPresenter {
  #filmsMainContainerComponent = new FilmsContainerView();
  #filmsListSectionComponent = new FilmsListSectionView();
  #filmContainerComponent = new FilmsListContainerView();
  #headerContainer = null;
  #mainContainer = null;
  #films = null;
  #comments = null;

  init = (headerContainer, mainContainer, filmsModel) => {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#films = [...filmsModel.films];
    this.#comments = [...filmsModel.comments];
    this.#renderPage();
    this.#renderPopup();
  };

  #renderPage = () => {
    render(new ProfileView(), this.#headerContainer);
    render(new NavigationView(), this.#mainContainer);
    render(new FilmsSortView(), this.#mainContainer);
    render(this.#filmsMainContainerComponent, this.#mainContainer);
    render(this.#filmsListSectionComponent, this.#filmsMainContainerComponent.element);
    render(this.#filmContainerComponent, this.#filmsListSectionComponent.element);
    for (let i = 0; i < this.#films.length; i++) {
      render(new FilmCardView(this.#films[i], this.#comments[i]), this.#filmContainerComponent.element);
    }
    render(new ShowMoreButtonView(), this.#filmsMainContainerComponent.element);
    for (let i = 0; i < EXTRA_FILMS_CARDS_AMOUNT; i++) {
      this.filmsListExtraContainerComponent = new FilmsListContainerView();
      this.filmsListExtraSectionComponent = new FilmsListExtraSectionView();
      render(this.filmsListExtraSectionComponent, this.#filmsMainContainerComponent.element);
      render(this.filmsListExtraContainerComponent, this.filmsListExtraSectionComponent.element);
      for (let j = 0; j < EXTRA_FILMS_CARDS_AMOUNT; j++) {
        render(new FilmCardView(this.#films[i], this.#comments[i]), this.filmsListExtraContainerComponent.element);
      }
    }
  };

  #renderPopup = () => {
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        document.body.classList.remove('hide-overflow');
        document.body.removeEventListener('keydown', onEscKeyDown);
        this.#mainContainer.lastChild.remove();
      }
    };

    const onClosePopupButtonClick = () => {
      document.body.classList.remove('hide-overflow');
      document.body.removeEventListener('keydown', onEscKeyDown);
      this.#mainContainer.lastChild.remove();
    };

    const onFilmImgClick = (evt) => {
      if (evt.target.nodeName === 'IMG' && evt.target.dataset.filmId){
        document.body.classList.add('hide-overflow');
        document.body.addEventListener('keydown', onEscKeyDown);
        render(new FilmPopupView(this.#films[evt.target.dataset.filmId], this.#comments), this.#mainContainer);
        const closePopupButtonElement = this.#mainContainer.lastChild.querySelector('.film-details__close-btn');
        closePopupButtonElement.addEventListener('click', onClosePopupButtonClick);
      }
    };
    document.body.addEventListener('click', onFilmImgClick);
  };
}
