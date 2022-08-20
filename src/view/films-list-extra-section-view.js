import AbstractView from '../framework/view/abstract-view.js';

const filmListExtraSectionElement = () => `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
    </section>`;

export default class FilmsListExtraSectionView extends AbstractView {
  get template () {
    return filmListExtraSectionElement();
  }
}
