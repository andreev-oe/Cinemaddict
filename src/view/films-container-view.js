import {createElement} from '../render.js';

const filmsMainContainerElement = () => '<section class="films"></section>';

export default class FilmsContainerView {
  getTemplate () {
    return filmsMainContainerElement();
  }

  getElement () {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
