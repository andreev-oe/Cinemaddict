import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatisticsElement = (films) => `<section class="footer__statistics">
    <p>${films.length} movies inside</p>
  </section>`;

export default class FooterStatisticsView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template () {
    return createFooterStatisticsElement(this.#films);
  }
}
