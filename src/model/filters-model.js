import Observable from '../framework/observable.js';
import {FilterType} from '../constants.js';

export default class FiltersModel extends Observable{
  #filter = FilterType.DEFAULT;

  get filter () {
    return this.#filter;
  }

  update (updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
