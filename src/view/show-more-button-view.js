import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreButtonElement = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonView extends AbstractView {
  #films = null;
  get template () {
    return createShowMoreButtonElement();
  }

  setOnShowMoreButtonClick = (callback, films) => {
    this.#films = films;
    this._callback.click = callback;
    this.element.addEventListener('click', this.#onShowMoreButtonClick);
  };

  #onShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.click(this.#films);
  };
}
