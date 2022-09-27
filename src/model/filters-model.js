import Observable from '../framework/observable.js';
import {FilterType} from '../constants.js';

export default class FiltersModel extends Observable{
  #filter = FilterType.ALL;

  getFilter () {
    return this.#filter;
  }

  setFilter (updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }

  filterAll = (model, element, cssClass) => {
    element.classList.add(cssClass);
    return model;
  };

  filterWatchList = (model, element, cssClass) => {
    element.classList.add(cssClass);
    return JSON.parse(JSON.stringify(model)).filter((film) => film.userDetails.watchlist);
  };

  filterHistory = (model, element, cssClass) => {
    element.classList.add(cssClass);
    return JSON.parse(JSON.stringify(model)).filter((film) => film.userDetails.alreadyWatched);
  };

  filterFavorites = (model, element, cssClass) => {
    element.classList.add(cssClass);
    return JSON.parse(JSON.stringify(model)).filter((film) => film.userDetails.favorite);
  };
}
