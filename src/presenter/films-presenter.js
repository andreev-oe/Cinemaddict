import {
  EXTRA_FILMS_CARDS_AMOUNT,
  FILMS_PORTION,
  UserAction
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
import FilterView from '../view/filter-view.js';
import ProfileView from '../view/profile-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import {
  remove,
  render,
  replace
} from '../framework/render.js';
import {
  sortByDefault,
  sortByDay,
  sortByRating,
} from '../utils/sort.js';
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
  #filterView = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #popupPresenter = null;
  #showMoreButtonPresenter = null;
  #filmPresenter = null;
  #shownFilteredFilmCards = [];
  #shownSortedFilmCards = [];
  #shownExtraFilmCards = [];

  constructor(headerContainer, mainContainer, footerContainer, filmsModel, commentsModel, filterModel) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#films = [...this.#filmsModel.getFilms()];
    this.#comments = [...this.#commentsModel.getAllComments()];
    this.#filmSortView = new FilmsSortView(this.#films);
    this.#filterView = new FilterView(this.#films);
    this.#footerStatisticsView = new FooterStatisticsView(this.#films);
    this.#profileView = new ProfileView();
    this.#popupPresenter = new PopupPresenter(this.#filmsModel, this.#commentsModel, this.#mainContainer, this.#userActionHandler);
    this.#showMoreButtonPresenter = new ShowMoreButtonPresenter();
    this.#filmPresenter = new Map();
  }

  get films () {
    return this.#films;
  }

  get comments () {
    return this.#commentsModel.comments;
  }

  set films (films) {
    this.#films = films;
  }

  init = (films = this.#films) => {
    this.#films = films;
    this.#filmSortView.films = films;
    this.#renderPage(films);
    document.body.addEventListener('click', this.#onControlButtonClick);
  };

  #userActionHandler = (actionType, updateType, filmData, commentData) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilms(updateType, filmData);
        this.#updateFilm(filmData);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, commentData);
        this.#filmsModel.updateFilms(updateType, filmData);
        this.#updateFilm(filmData);
        this.#popupPresenter.updatePopup(filmData);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, commentData);
        this.#filmsModel.updateFilms(updateType, filmData);
        this.#updateFilm(filmData);
        this.#popupPresenter.updatePopup(filmData);
        break;
    }
  };

  #onControlButtonClick = (evt) =>{
    if (evt.target.dataset.button) {
      const i = evt.target.parentNode.dataset.filmId;
      this.#updateFilm(this.#films.find((film) => film.id === Number(i)));
      const prevFilterView = this.#filterView;
      this.#filterView = new FilterView(this.#films);
      replace(this.#filterView, prevFilterView);
      remove(prevFilterView);
      this.#filterView.setFilterButtonsHandlers(
        this.#filterModel.filterAll,
        this.#filterModel.filterWatchList,
        this.#filterModel.filterHistory,
        this.#filterModel.filterFavorites,
        this.#shownFilteredFilmCards,
        this
      );
      if (!this.#popupPresenter.popupClosedState) {
        this.#popupPresenter.updatePopup(this.#films[i]);
      }
    }
  };

  #renderPage = (films = this.#films) => {
    this.#mainContainer.innerHTML = '';
    render(this.#profileView, this.#headerContainer);
    render(this.#filterView, this.#mainContainer);
    render(this.#filmSortView, this.#mainContainer);
    render(this.#footerStatisticsView, this.#footerContainer);
    this.renderContent(films);
  };

  renderContent = (films = this.#films) => {
    this.#filmSortView.setSortButtonsHandlers(
      sortByDefault,
      sortByDay,
      sortByRating,
      this.renderContent,
      this.#shownSortedFilmCards,
      films
    );
    this.#filterView.setFilterButtonsHandlers(
      this.#filterModel.filterAll,
      this.#filterModel.filterWatchList,
      this.#filterModel.filterHistory,
      this.#filterModel.filterFavorites,
      this.#shownFilteredFilmCards,
      this
    );
    if (this.#shownExtraFilmCards) {
      this.#shownExtraFilmCards.forEach((extraFilmCard) => extraFilmCard.element.parentElement.remove());
    }
    this.#renderedFilmCards = FILMS_PORTION;
    this.#shownSortedFilmCards = this.#filmSortView.showedFilms;
    this.#shownFilteredFilmCards = this.#filterView.showedFilms;
    render(this.#filmsMainContainerComponent, this.#mainContainer);
    if (films.length !== 0) {
      render(this.#filmsListSectionComponent, this.#filmsMainContainerComponent.element);
      render(this.#filmContainerComponent, this.#filmsListSectionComponent.element);
      this.#renderFilmCards(films);
      if (this.#showMoreButtonPresenter) {
        this.#showMoreButtonPresenter.destroy();
      }
      if (films.length > FILMS_PORTION) {
        this.#showMoreButtonPresenter.renderShowMoreButton(this.#filmsMainContainerComponent, this.#onShowMoreButtonClick, films);
        this.#renderExtraFilms();
      }
      document.body.addEventListener('click', this.#popupPresenter.onFilmImgClick);
    } else {
      render(this.#noFilmsListSectionComponent, this.#filmsMainContainerComponent.element);
      render(this.#filmContainerComponent, this.#noFilmsListSectionComponent.element);
    }
  };

  #renderFilmCards = (films) => {
    for (let i = 0; i < Math.min(films.length, FILMS_PORTION); i++) {
      this.#renderFilmCard(i, films);
    }
  };

  #renderFilmCard = (i, films = this.#films, comments = this.#comments, container = this.#filmContainerComponent) => {
    const filmCard = new FilmCardPresenter(films[i], comments[i], container.element);
    this.#shownFilteredFilmCards.push(filmCard);
    this.#shownSortedFilmCards.push(filmCard);
    filmCard.renderFilmCard(films[i]);
    this.#filmPresenter.set(films[i].id, filmCard);
  };

  #renderExtraFilms = () => {
    for (let i = 0; i < EXTRA_FILMS_CARDS_AMOUNT; i++) {
      this.filmsListExtraContainerComponent = new FilmsListContainerView();
      this.#shownExtraFilmCards.push(this.filmsListExtraContainerComponent);
      this.filmsListExtraSectionComponent = new FilmsListExtraSectionView();
      render(this.filmsListExtraSectionComponent, this.#filmsMainContainerComponent.element);
      render(this.filmsListExtraContainerComponent, this.filmsListExtraSectionComponent.element);
      for (let j = 0; j < EXTRA_FILMS_CARDS_AMOUNT; j++) {
        this.#renderFilmCard(this.#films.length - EXTRA_FILMS_CARDS_AMOUNT, this.#films, this.#comments, this.filmsListExtraContainerComponent);
      }
    }
  };

  #onShowMoreButtonClick = (films = this.#films) => {
    films.slice(this.#renderedFilmCards, this.#renderedFilmCards + FILMS_PORTION).forEach((film, index) => this.#renderFilmCard(index + this.#renderedFilmCards, films));
    this.#renderedFilmCards += FILMS_PORTION;
    if (this.#renderedFilmCards >= films.length) {
      this.#showMoreButtonPresenter.destroy();
    }
  };

  #updateFilm = (filmToUpdate) => {
    this.#films = updateFilm(this.#filmsModel.getFilms(), filmToUpdate);
    this.#filmPresenter.get(filmToUpdate.id).renderFilmCard(filmToUpdate);
  };
}
