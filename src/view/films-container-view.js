import {createElement} from '../render.js';

const filmsMainContainerElement = () => '<section class="films"></section>';

export default class FilmsContainerView {
  #element = null;

  get template () {
    return filmsMainContainerElement();
  }

  get element () {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
