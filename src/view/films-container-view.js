import AbstractView from '../framework/view/abstract-view.js';

const filmsMainContainerElement = () => '<section class="films"></section>';

export default class FilmsContainerView extends AbstractView {
  get template () {
    return filmsMainContainerElement();
  }
}
