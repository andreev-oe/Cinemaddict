import {render} from '../framework/render.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class ShowMoreButtonPresenter {
  #showMoreButton = null;

  constructor() {
    this.#showMoreButton = new ShowMoreButtonView();
  }

  renderShowMoreButton = (container, clickHandler) => {
    render(this.#showMoreButton, container.element);
    this.#showMoreButton.setShowMoreButtonClickHandler(clickHandler);
  };

  remove = () => {
    this.#showMoreButton.element.remove();
    this.#showMoreButton.removeElement();
  };
}
