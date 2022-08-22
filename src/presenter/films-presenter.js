import {
  EXTRA_FILMS_CARDS_AMOUNT,
  FILMS_PORTION
} from '../constants.js';
import PopupPresenter from './popup-presenter.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import NoFilmsListSectionView from '../view/no-films-list-section-view.js';
import FilmsListExtraSectionView from '../view/films-list-extra-section-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsSortView from '../view/films-sort-view.js';
import NavigationView from '../view/navigation-view.js';
import ProfileView from '../view/profile-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import {render} from '../framework/render.js';
import {
  sortByDefault,
  sortByDay,
  sortByRating,
} from '../utils/filters.js';

export default class FilmsPresenter {
  #filmsMainContainerComponent = new FilmsContainerView();
  #filmsListSectionComponent = new FilmsListSectionView();
  #noFilmsListSectionComponent = new NoFilmsListSectionView();
  #filmContainerComponent = new FilmsListContainerView();
  #showMoreButton = new ShowMoreButtonView();
  #renderedFilmCards = FILMS_PORTION;
  #headerContainer = null;
  #mainContainer = null;
  #footerContainer = null;
  #footerStatisticsView = null;
  #profileView = null;
  #films = null;
  #comments = null;
  #filmSortView = null;
  #navigationView = null;
  #filmsModel = null;
  #popupPresenter = null;

  constructor(headerContainer, mainContainer, footerContainer, filmsModel) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#filmsModel.comments];
    this.#filmSortView = new FilmsSortView(this.#films);
    this.#navigationView = new NavigationView(this.#films);
    this.#footerStatisticsView = new FooterStatisticsView(this.#films);
    this.#profileView = new ProfileView();
    this.#popupPresenter = new PopupPresenter(this.#filmsModel, this.#mainContainer);
  }

  init = () => {
    this.#renderPage();
  };

  #renderPage = () => {
    this.#filmSortView.setSortButtonsHandlers(sortByDefault, sortByDay, sortByRating);
    render(this.#profileView, this.#headerContainer);
    render(this.#navigationView, this.#mainContainer);
    render(this.#filmSortView, this.#mainContainer);
    render(this.#footerStatisticsView, this.#footerContainer);
    render(this.#filmsMainContainerComponent, this.#mainContainer);
    if (this.#films.length !== 0) {
      render(this.#filmsListSectionComponent, this.#filmsMainContainerComponent.element);
      render(this.#filmContainerComponent, this.#filmsListSectionComponent.element);
      this.#renderFilmCards();
      document.body.addEventListener('click', this.#popupPresenter.onFilmImgClick);
      if (this.#films.length > FILMS_PORTION) {
        this.#renderShowMoreButton();
        this.#renderExtraFilms();
      }
    } else {
      render(this.#noFilmsListSectionComponent, this.#filmsMainContainerComponent.element);
      render(this.#filmContainerComponent, this.#noFilmsListSectionComponent.element);
    }
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButton, this.#filmsMainContainerComponent.element);
    this.#showMoreButton.setShowMoreButtonClickHandler(this.#onShowMoreButtonClick);
  };

  #renderFilmCard = (i) => {
    render(new FilmCardView(this.#films[i], this.#comments[i]), this.#filmContainerComponent.element);
  };

  #renderFilmCards = () => {
    for (let i = 0; i < Math.min(this.#films.length, FILMS_PORTION) ; i++) {
      this.#renderFilmCard(i);
    }
  };

  #renderExtraFilms = () => {
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

  #onShowMoreButtonClick = () => {
    this.#films.slice(this.#renderedFilmCards, this.#renderedFilmCards + FILMS_PORTION).forEach((film) => render(new FilmCardView(film, this.#comments[film.id]), this.#filmContainerComponent.element));
    this.#renderedFilmCards += FILMS_PORTION;
    if (this.#renderedFilmCards >= this.#films.length) {
      this.#showMoreButton.element.remove();
      this.#showMoreButton.removeElement();
    }
  };
}
