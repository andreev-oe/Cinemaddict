import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreButtonElement = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonView extends AbstractView {
  get template () {
    return createShowMoreButtonElement();
  }
}
