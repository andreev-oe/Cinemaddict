import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../constants.js';

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

const createNavigationElement = (films) => {
  const items = countNavItems(films);
  return `<nav class="main-navigation">
    <a href="#${FilterType.ALL}" data-filter-type = "all" class="main-navigation__item-all main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#${FilterType.WATCHLIST}" data-filter-type = "watchlist" class="main-navigation__item-watchlist main-navigation__item">Watchlist <span class="main-navigation__item-count">${items.watchListCount}</span></a>
    <a href="#${FilterType.HISTORY}" data-filter-type = "history" class="main-navigation__item-history main-navigation__item">History <span class="main-navigation__item-count">${items.watchedCount}</span></a>
    <a href="#${FilterType.FAVOURITES}" data-filter-type = "favourites" class="main-navigation__item-favourites main-navigation__item">Favorites <span class="main-navigation__item-count">${items.favouriteCount}</span></a>
  </nav>`;
};

export default class FilterView extends AbstractView {
  #films = null;
  #selectedFilter = null;
  #activeButtonClass = 'main-navigation__item--active';
  #filterAllButton = null;
  #filterWatchListButton = null;
  #filterHistoryButton = null;
  #filterFavoritesButton = null;
  #shownFilmCards = [];
  #filterButtons = null;
  #filmsPresenter = null;

  constructor(films, selectedFilter) {
    super();
    this.#films = films;
    this.#selectedFilter = selectedFilter;
    this.#filterAllButton = this.element.querySelector('.main-navigation__item-all');
    this.#filterWatchListButton = this.element.querySelector('.main-navigation__item-watchlist');
    this.#filterHistoryButton = this.element.querySelector('.main-navigation__item-history');
    this.#filterFavoritesButton = this.element.querySelector('.main-navigation__item-favourites');
    this.#filterButtons = this.element.children;
  }

  get showedFilms () {
    return this.#shownFilmCards;
  }

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

  setFilterButtonsHandlers = (all, watchList, history, favorites, shownFilmCards, filmsPresenter) => {
    this.#filmsPresenter = filmsPresenter;
    this._callback.filterAll = all;
    this._callback.filterWatchList = watchList;
    this._callback.filterHistory = history;
    this._callback.filterFavorites = favorites;
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
    this.#filmsPresenter.films = filteredFilms;
    this.#filmsPresenter.init(filteredFilms);
  };

  #onFilterWatchListButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#filterWatchListButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#clearContent(this);
    const filteredFilms = this._callback.filterWatchList(this.#films, this.#filterWatchListButton, this.#activeButtonClass);
    this.#filmsPresenter.films = filteredFilms;
    this.#filmsPresenter.init(filteredFilms);
  };

  #onFilterHistoryButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#filterHistoryButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#clearContent(this);
    const filteredFilms = this._callback.filterHistory(this.#films, this.#filterHistoryButton, this.#activeButtonClass);
    this.#filmsPresenter.films = filteredFilms;
    this.#filmsPresenter.init(filteredFilms);
  };

  #onFilterFavoritesButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#filterFavoritesButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#clearContent(this);
    const filteredFilms = this._callback.filterFavorites(this.#films, this.#filterFavoritesButton, this.#activeButtonClass);
    this.#filmsPresenter.films = filteredFilms;
    this.#filmsPresenter.init(filteredFilms);
  };

  get template () {
    return createNavigationElement(this.#films);
  }
}
