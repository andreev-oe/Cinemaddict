import {
  render,
  remove
} from '../framework/render.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class ShowMoreButtonPresenter {
  #showMoreButton = null;

  constructor() {
    this.#showMoreButton = new ShowMoreButtonView();
  }

  renderShowMoreButton = (container, clickHandler, films) => {
    render(this.#showMoreButton, container.element);
    this.#showMoreButton.setOnShowMoreButtonClick(clickHandler, films);
  };

  destroy = () => remove(this.#showMoreButton);
}
