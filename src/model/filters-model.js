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
}
