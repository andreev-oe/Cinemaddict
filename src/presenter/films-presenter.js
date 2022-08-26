import {
  EXTRA_FILMS_CARDS_AMOUNT,
  FILMS_PORTION
} from '../constants.js';
import PopupPresenter from './popup-presenter.js';
import FilmCardPresenter from './film-card-presenter.js';
import ShowMoreButtonPresenter from './show-more-button-presenter.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import NoFilmsListSectionView from '../view/no-films-list-section-view.js';
import FilmsListExtraSectionView from '../view/films-list-extra-section-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsSortView from '../view/films-sort-view.js';
import NavigationView from '../view/navigation-view.js';
import ProfileView from '../view/profile-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import {render} from '../framework/render.js';
import {
  sortByDefault,
  sortByDay,
  sortByRating,
} from '../utils/filters.js';
import {updateFilm} from '../utils/utilities.js';

export default class FilmsPresenter {
  #filmsMainContainerComponent = new FilmsContainerView();
  #filmsListSectionComponent = new FilmsListSectionView();
  #noFilmsListSectionComponent = new NoFilmsListSectionView();
  #filmContainerComponent = new FilmsListContainerView();
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
  #showMoreButtonPresenter = null;
  #filmPresenter = null;

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
    this.#showMoreButtonPresenter = new ShowMoreButtonPresenter();
    this.#filmPresenter = new Map();
  }

  init = () => {
    this.#renderPage();
    document.body.addEventListener('click', this.#onControlButtonClick);
  };

  #onControlButtonClick = (evt) =>{
    if (evt.target.dataset.button) {
      const i = evt.target.parentNode.dataset.filmId;
      this.#updateFilm(this.#films[i]);
      if (!this.#popupPresenter.popupClosedState) {
        this.#popupPresenter.updatePopup(this.#films[i]);
      }
    }
  };

  #renderPage = () => {
    this.#filmSortView.setSortButtonsHandlers(sortByDefault, sortByDay, sortByRating, this.renderContent);
    render(this.#profileView, this.#headerContainer);
    render(this.#navigationView, this.#mainContainer);
    render(this.#filmSortView, this.#mainContainer);
    render(this.#footerStatisticsView, this.#footerContainer);
    this.renderContent();
    if (this.#films.length > FILMS_PORTION) {
      this.#showMoreButtonPresenter.renderShowMoreButton(this.#filmsMainContainerComponent, this.#onShowMoreButtonClick);
      this.#renderExtraFilms();
    }
  };

  renderContent = (films = this.#films) => {
    render(this.#filmsMainContainerComponent, this.#mainContainer);
    if (films.length !== 0) {
      render(this.#filmsListSectionComponent, this.#filmsMainContainerComponent.element);
      render(this.#filmContainerComponent, this.#filmsListSectionComponent.element);
      this.#renderFilmCards();
      document.body.addEventListener('click', this.#popupPresenter.onFilmImgClick);
    } else {
      render(this.#noFilmsListSectionComponent, this.#filmsMainContainerComponent.element);
      render(this.#filmContainerComponent, this.#noFilmsListSectionComponent.element);
    }
  };

  #renderFilmCard = (i, container = this.#filmContainerComponent) => {
    const filmCard = new FilmCardPresenter(this.#films[i], this.#comments[i], container.element);
    filmCard.renderFilmCard(this.#films[i]);
    this.#filmPresenter.set(this.#films[i].id, filmCard);
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
        this.#renderFilmCard(this.#films.length - EXTRA_FILMS_CARDS_AMOUNT, this.filmsListExtraContainerComponent);
      }
    }
  };

  #onShowMoreButtonClick = () => {
    this.#films.slice(this.#renderedFilmCards, this.#renderedFilmCards + FILMS_PORTION).forEach((film, index) => this.#renderFilmCard(index + this.#renderedFilmCards));
    this.#renderedFilmCards += FILMS_PORTION;
    if (this.#renderedFilmCards >= this.#films.length) {
      this.#showMoreButtonPresenter.destroy();
    }
  };

  #updateFilm = (filmToUpdate) => {
    this.#films = updateFilm(this.#films, filmToUpdate);
    this.#filmPresenter.get(filmToUpdate.id).renderFilmCard(filmToUpdate);
  };
}
