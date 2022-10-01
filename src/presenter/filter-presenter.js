import {render, remove} from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterView = null;

  constructor() {
    this.#filterView = new FilterView();
  }

  init = (container) => {
    render(this.#filterView, container.element);
  };

  destroy = () => {
    remove(this.#filterView);
  };
}
