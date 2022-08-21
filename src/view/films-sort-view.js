import AbstractView from '../framework/view/abstract-view.js';

const createSortElement = () => `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--default sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button sort__button--date">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--rating">Sort by rating</a></li>
  </ul>`;

export default class FilmsSortView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template () {
    return createSortElement();
  }

  setSortButtonsHandlers = (defaultSort, daySort, ratingSort) => {
    this._callback.defaultSort = defaultSort;
    this._callback.daySort = daySort;
    this._callback.ratingSort = ratingSort;
    this.element.querySelector('.sort__button--default').addEventListener('click', this.#onDefaultSortButtonClick);
    this.element.querySelector('.sort__button--date').addEventListener('click', this.#onDaySortButtonClick);
    this.element.querySelector('.sort__button--rating').addEventListener('click', this.#onRatingSortButtonClick);
  };

  #onDefaultSortButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.defaultSort(this.#films);
  };

  #onDaySortButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.daySort(this.#films);
  };

  #onRatingSortButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.ratingSort(this.#films);
  };
}
