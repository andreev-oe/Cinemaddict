import AbstractView from '../framework/view/abstract-view.js';

const filmListContainerElement = () => '<div class="films-list__container"></div>';

export default class FilmsListContainerView extends AbstractView {
  get template () {
    return filmListContainerElement();
  }
}
