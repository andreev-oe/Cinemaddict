import {createElement} from '../render.js';

const filmListContainerElement = () => '<div class="films-list__container"></div>';

export default class FilmsListContainerView {
  getTemplate () {
    return filmListContainerElement();
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
