import AbstractView from '../framework/view/abstract-view.js';

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

const createNavigationElement = (films, selectedFilter) => {
  const items = countNavItems(films);
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item ${selectedFilter === 'all' ? 'main-navigation__item--active' : ''}">All movies</a>
    <a href="#watchlist" class="main-navigation__item ${selectedFilter === 'watchlist' ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${items.watchListCount}</span></a>
    <a href="#history" class="main-navigation__item ${selectedFilter === 'history' ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${items.watchedCount}</span></a>
    <a href="#favorites" class="main-navigation__item ${selectedFilter === 'favorites' ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${items.favouriteCount}</span></a>
  </nav>`;
};

export default class FilterView extends AbstractView {
  #films = null;
  #selectedFilter = null;
  constructor(films, selectedFilter) {
    super();
    this.#films = films;
    this.#selectedFilter = selectedFilter;
  }

  get template () {
    return createNavigationElement(this.#films, this.#selectedFilter);
  }
}
