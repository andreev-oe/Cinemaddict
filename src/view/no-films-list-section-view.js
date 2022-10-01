import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../constants.js';

const createNoFilmListSectionElement = (selectedFilter, setNoFilmText) => `<section class="films-list">
      <h2 class="films-list__title">${setNoFilmText(selectedFilter)}</h2>`;

export default class NoFilmsListSectionView extends AbstractView {
  #selectedFilter = null;

  constructor(selectedFilter) {
    super();
    this.#selectedFilter = selectedFilter;
  }

  get template () {
    return createNoFilmListSectionElement(this.#selectedFilter, this.#setNoFilmText);
  }

  #setNoFilmText = (selectedFilter) => {
    switch (selectedFilter) {
      case FilterType.ALL:
        return 'There are no movies in our database';
      case FilterType.WATCHLIST:
        return 'There are no movies to watch now';
      case FilterType.HISTORY:
        return 'There are no watched movies now';
      case FilterType.FAVOURITES:
        return 'There are no favorite movies now';
    }
  };
}
