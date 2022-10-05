import AbstractView from '../framework/view/abstract-view.js';
import {
  ACTIVE_FILTER_BUTTON_CLASS,
  FilterType
} from '../constants.js';

const countNavItems = (films) => {
  const items = {
    watchListCount: 0,
    watchedCount: 0,
    favouriteCount: 0,
  };
  films.forEach((film) => {
    if (film.userDetails.watchlist) {
      items.watchListCount++;
    }
    if (film.userDetails.alreadyWatched) {
      items.watchedCount++;
    }
    if (film.userDetails.favorite) {
      items.favouriteCount++;
    }
  });
  return items;
};

export default class FilterView extends AbstractView {
  #films = null;
  #filmsModel = null;
  #items = null;
  #filteredFilms = null;
  #activeButtonClass = ACTIVE_FILTER_BUTTON_CLASS;
  #filterAllButton = null;
  #filterWatchListButton = null;
  #filterHistoryButton = null;
  #filterFavoritesButton = null;
  #shownFilmCards = [];
  #filterButtons = null;
  #filmsPresenter = null;
  #selectedFilter = FilterType.ALL;

  constructor(srcFilms, films, selectedFilter, filmsModel) {
    super();
    this.#filmsModel = filmsModel;
    this.#films = this.#filmsModel.films;
    this.#items = null;
    this.#selectedFilter = selectedFilter;
    this.#filteredFilms = films;
    this.#filterAllButton = this.element.querySelector('.main-navigation__item-all');
    this.#filterWatchListButton = this.element.querySelector('.main-navigation__item-watchlist');
    this.#filterHistoryButton = this.element.querySelector('.main-navigation__item-history');
    this.#filterFavoritesButton = this.element.querySelector('.main-navigation__item-favourites');
    this.#filterButtons = this.element.children;
  }

  get template () {
    return this.createNavigationElement(this.#films, this.#selectedFilter);
  }

  get films () {
    return this.#films;
  }

  set films (films) {
    this.#films = films;
  }

  get showedFilms () {
    return this.#shownFilmCards;
  }

  createNavigationElement = (films, selectedFilter) => {
    this.#items = countNavItems(films);
    return `<nav class="main-navigation">
    <a href="#${FilterType.ALL}" data-filter-type = "all" class="main-navigation__item-all main-navigation__item ${selectedFilter === FilterType.ALL ? 'main-navigation__item--active' : ''}">All movies</a>
    <a href="#${FilterType.WATCHLIST}" data-filter-type = "watchlist" class="main-navigation__item-watchlist main-navigation__item ${selectedFilter === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${this.#items.watchListCount}</span></a>
    <a href="#${FilterType.HISTORY}" data-filter-type = "history" class="main-navigation__item-history main-navigation__item ${selectedFilter === FilterType.HISTORY ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${this.#items.watchedCount}</span></a>
    <a href="#${FilterType.FAVOURITES}" data-filter-type = "favourites" class="main-navigation__item-favourites main-navigation__item ${selectedFilter === FilterType.FAVOURITES ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${this.#items.favouriteCount}</span></a>
  </nav>`;
  };

  #removeActiveButtonClass = () => {
    for (const filterButton of this.#filterButtons) {
      if (filterButton.classList.contains('main-navigation__item--active')) {
        filterButton.classList.remove('main-navigation__item--active');
        return;
      }
    }
  };

  #clearContent = (thisContent) => {
    thisContent.#shownFilmCards.forEach((filmCard) => filmCard.destroy());
    thisContent.#shownFilmCards = [];
    thisContent.#removeActiveButtonClass();
  };

  setFilterButtonsHandlers = (all, watchList, history, favorites, shownFilmCards, filmsPresenter, defaultSort) => {
    this.#filmsPresenter = filmsPresenter;
    this._callback.filterAll = all;
    this._callback.filterWatchList = watchList;
    this._callback.filterHistory = history;
    this._callback.filterFavorites = favorites;
    this._callback.defaultSort = defaultSort;
    this.#shownFilmCards = shownFilmCards;
    this.#filterAllButton.addEventListener('click', this.#onFilterAllButtonClick);
    this.#filterWatchListButton.addEventListener('click', this.#onFilterWatchListButtonClick);
    this.#filterHistoryButton.addEventListener('click', this.#onFilterHistoryButtonClick);
    this.#filterFavoritesButton.addEventListener('click', this.#onFilterFavoritesButtonClick);
  };

  #onFilterAllButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#filterAllButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#clearContent(this);
    const filteredFilms = this._callback.filterAll(this.#films, this.#filterAllButton, this.#activeButtonClass);
    this.#filmsPresenter.filter = FilterType.ALL;
    this.#filmsPresenter.films = filteredFilms;
    this.#filmsPresenter.init(filteredFilms);
    this.#filteredFilms = filteredFilms;
    this.createNavigationElement(this.#films, this.#filmsPresenter.filter);
    this._callback.defaultSort(evt);
  };

  #onFilterWatchListButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#filterWatchListButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#clearContent(this);
    const filteredFilms = this._callback.filterWatchList(this.#films, this.#filterWatchListButton, this.#activeButtonClass);
    this.#filmsPresenter.filter = FilterType.WATCHLIST;
    this.#filmsPresenter.films = filteredFilms;
    this.#filmsPresenter.init(filteredFilms);
    this.#filteredFilms = filteredFilms;
    this.createNavigationElement(this.#films, this.#filmsPresenter.filter);
    this._callback.defaultSort(evt);
  };

  #onFilterHistoryButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#filterHistoryButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#clearContent(this);
    const filteredFilms = this._callback.filterHistory(this.#films, this.#filterHistoryButton, this.#activeButtonClass);
    this.#filmsPresenter.filter = FilterType.HISTORY;
    this.#filmsPresenter.films = filteredFilms;
    this.#filmsPresenter.init(filteredFilms);
    this.#filteredFilms = filteredFilms;
    this.createNavigationElement(this.#films, this.#filmsPresenter.filter);
    this._callback.defaultSort(evt);
  };

  #onFilterFavoritesButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#filterFavoritesButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#clearContent(this);
    const filteredFilms = this._callback.filterFavorites(this.#films, this.#filterFavoritesButton, this.#activeButtonClass);
    this.#filmsPresenter.filter = FilterType.FAVOURITES;
    this.#filmsPresenter.films = filteredFilms;
    this.#filmsPresenter.init(filteredFilms);
    this.#filteredFilms = filteredFilms;
    this.createNavigationElement(this.#films, this.#filmsPresenter.filter);
    this._callback.defaultSort(evt);
  };

}
