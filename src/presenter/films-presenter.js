import {
  DeleteButtonText,
  FILMS_PORTION,
  FilterType,
  UpdateType,
  UserAction
} from '../constants.js';
import PopupPresenter from './popup-presenter.js';
import FilmCardPresenter from './film-card-presenter.js';
import ShowMoreButtonPresenter from './show-more-button-presenter.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import NoFilmsListSectionView from '../view/no-films-list-section-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsSortView from '../view/films-sort-view.js';
import FilterView from '../view/filter-view.js';
import ProfileView from '../view/profile-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
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
import {UiBlockerLimit} from '../constants.js';

export default class FilmsPresenter {
  #filmsMainContainerComponent = new FilmsContainerView();
  #filmsListSectionComponent = new FilmsListSectionView();
  #noFilmsListSectionComponent = null;
  #filmContainerComponent = new FilmsListContainerView();
  #renderedFilmCards = FILMS_PORTION;
  #headerContainer = null;
  #mainContainer = null;
  #footerContainer = null;
  #footerStatisticsView = null;
  #profileView = null;
  #films = null;
  #srcFilms = null;
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
  #selectedFilter = FilterType.ALL;
  #uiBlocker = new UiBlocker(UiBlockerLimit.LOWER_LIMIT, UiBlockerLimit.UPPER_LIMIT);

  constructor(headerContainer, mainContainer, footerContainer, filmsModel, commentsModel, filterModel) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#films = [...this.#filmsModel.films];
    this.#srcFilms = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];
    this.#showMoreButtonPresenter = new ShowMoreButtonPresenter();
    this.#filmPresenter = new Map();
    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films () {
    return this.#films;
  }

  set films (films) {
    this.#films = films;
  }

  get comments () {
    return this.#commentsModel.comments;
  }

  get filter () {
    return this.#selectedFilter;
  }

  set filter (filter) {
    this.#selectedFilter = filter;
  }

  init = (films = this.#films) => {
    const prevFilterView = this.#filterView;
    this.#films = films;
    this.#filterView = new FilterView(this.#srcFilms, films, this.#selectedFilter, this.#filmsModel);
    if (prevFilterView) {
      replace(this.#filterView, prevFilterView);
      remove(prevFilterView);
    }
    this.#filmSortView = new FilmsSortView(films);
    this.#filmSortView.films = films;
    if (this.#popupPresenter) {
      document.body.removeEventListener('click', this.#popupPresenter.onFilmImgClick);
    }
    this.#popupPresenter = new PopupPresenter(this.#filmsModel, this.#commentsModel, this.#mainContainer, this.#userActionHandler, this.#uiBlocker);
    this.#popupPresenter.setScrollPosition = 0;
    this.#renderPage(films);
  };

  #userActionHandler = async (actionType, updateType, filmData, commentData) => {
    let filmToUpdate = {};
    const prevProfileView = this.#profileView;
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        await this.#filmsModel.updateFilm(updateType, filmData);
        this.#films = this.#filmsModel.films;
        this.#srcFilms = this.#filmsModel.films;
        if (!this.#films.length) {
          this.#filmPresenter.get(filmData.id).filmCardView.shake();
          this.#uiBlocker.unblock();
          return;
        }
        if (prevProfileView) {
          this.#profileView = new ProfileView(this.#srcFilms);
          replace(this.#profileView, prevProfileView);
        }
        switch (this.#selectedFilter) {
          case FilterType.ALL:
            break;
          case FilterType.HISTORY:
            if (!filmData.userDetails.alreadyWatched) {
              this.#filmPresenter.get(filmData.id).destroy();
            }
            break;
          case FilterType.FAVOURITES:
            if (!filmData.userDetails.favorite) {
              this.#filmPresenter.get(filmData.id).destroy();
            }
            break;
          case FilterType.WATCHLIST:
            if (!filmData.userDetails.watchlist) {
              this.#filmPresenter.get(filmData.id).destroy();
            }
            break;
        }
        this.#updateFilm(filmData);
        this.#filterView.setFilterButtonsHandlers(
          this.#filterModel.filterAll,
          this.#filterModel.filterWatchList,
          this.#filterModel.filterHistory,
          this.#filterModel.filterFavorites,
          this.#shownFilteredFilmCards,
          this,
          this.#filmSortView.defaultSort
        );
        if (!this.#popupPresenter.popupClosedState) {
          this.#popupPresenter.updatePopup();
        }
        break;
      case UserAction.ADD_COMMENT:
        await this.#commentsModel.addComment(updateType, commentData, filmData);
        await this.#filmsModel.updateFilm(updateType, filmData);
        this.#films = this.#filmsModel.films;
        if (!this.#films.length) {
          this.#popupPresenter.popupView.setFormShake();
          this.#uiBlocker.unblock();
          return;
        }
        filmToUpdate = this.#filmsModel.films.find((film) => film.id === filmData.id);
        this.#updateFilm(filmToUpdate);
        this.#popupPresenter.updatePopup();
        break;
      case UserAction.DELETE_COMMENT:
        this.#popupPresenter.commentDeleteBtn = DeleteButtonText.DELETING;
        await this.#commentsModel.deleteComment(updateType, commentData);
        await this.#filmsModel.updateFilm(updateType, filmData);
        this.#films = this.#filmsModel.films;
        if (!this.#films.length) {
          this.#popupPresenter.commentDeleteBtn = DeleteButtonText.DELETE;
          this.#popupPresenter.popupView.setCommentShake();
          this.#uiBlocker.unblock();
          return;
        }
        filmToUpdate = this.#filmsModel.films.find((film) => film.id === filmData.id);
        this.#updateFilm(filmToUpdate);
        this.#popupPresenter.updatePopup();
        break;
    }
    this.#uiBlocker.unblock();
  };

  #renderPage = (films = this.#films) => {
    this.#mainContainer.innerHTML = '';
    if (this.#profileView) {
      remove(this.#profileView);
    }
    this.#profileView = new ProfileView(this.#srcFilms);
    render(this.#profileView, this.#headerContainer);
    render(this.#filterView, this.#mainContainer);
    render(this.#filmSortView, this.#mainContainer);
    const prevFooterStatisticView = this.#footerStatisticsView;
    if (prevFooterStatisticView) {
      remove(prevFooterStatisticView);
    }
    this.#footerStatisticsView = new FooterStatisticsView(this.#srcFilms);
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
      this,
      this.#filmSortView.defaultSort
    );
    this.#renderedFilmCards = FILMS_PORTION;
    this.#shownSortedFilmCards = this.#filmSortView.showedFilms;
    this.#shownFilteredFilmCards = this.#filterView.showedFilms;
    render(this.#filmsMainContainerComponent, this.#mainContainer);
    if (this.#films.length !== 0) {
      if (this.#noFilmsListSectionComponent) {
        remove(this.#noFilmsListSectionComponent);
      }
      render(this.#filmsListSectionComponent, this.#filmsMainContainerComponent.element);
      render(this.#filmContainerComponent, this.#filmsListSectionComponent.element);
      this.#renderFilmCards(films);
      if (this.#showMoreButtonPresenter) {
        this.#showMoreButtonPresenter.destroy();
      }
      if (films.length > FILMS_PORTION) {
        this.#showMoreButtonPresenter.renderShowMoreButton(this.#filmsMainContainerComponent, this.#onShowMoreButtonClick, films);
      }
      document.body.addEventListener('click', this.#popupPresenter.onFilmImgClick);
    } else {
      remove(this.#filmSortView);
      if (this.#noFilmsListSectionComponent) {
        remove(this.#noFilmsListSectionComponent);
      }
      if (this.#showMoreButtonPresenter) {
        this.#showMoreButtonPresenter.destroy();
      }
      this.#noFilmsListSectionComponent = new NoFilmsListSectionView(this.#selectedFilter);
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
    const filmCard = new FilmCardPresenter(films[i], comments[i], container.element, this.#userActionHandler);
    this.#shownFilteredFilmCards.push(filmCard);
    this.#shownSortedFilmCards.push(filmCard);
    filmCard.renderFilmCard(films[i]);
    this.#filmPresenter.set(films[i].id, filmCard);
  };

  #updateFilm = (filmToUpdate) => {
    this.#films = this.#filmsModel.films;
    this.#filmPresenter.get(filmToUpdate.id).renderFilmCard(filmToUpdate);
  };

  #handleModelEvent = (updateType) => {
    const prevFilterView = this.#filterView;
    switch (updateType) {
      case UpdateType.INIT:
        this.#srcFilms = this.#filmsModel.films;
        this.init(this.#srcFilms);
        break;
      case UpdateType.PATCH:
        if (!this.#popupPresenter.popupClosedState) {
          this.#popupPresenter.updatePopup();
        }
        this.#filterView = new FilterView(this.#srcFilms, this.#films, this.#selectedFilter, this.#filmsModel);
        if (prevFilterView) {
          replace(this.#filterView, prevFilterView);
          remove(prevFilterView);
        }
        this.#filterView.setFilterButtonsHandlers(
          this.#filterModel.filterAll,
          this.#filterModel.filterWatchList,
          this.#filterModel.filterHistory,
          this.#filterModel.filterFavorites,
          this.#shownFilteredFilmCards,
          this,
          this.#filmSortView.defaultSort);
        break;
    }
  };

  #onShowMoreButtonClick = (films = this.#films) => {
    films.slice(this.#renderedFilmCards, this.#renderedFilmCards + FILMS_PORTION).forEach((film, index) => this.#renderFilmCard(index + this.#renderedFilmCards, films));
    this.#renderedFilmCards += FILMS_PORTION;
    if (this.#renderedFilmCards >= films.length) {
      this.#showMoreButtonPresenter.destroy();
    }
  };
}
