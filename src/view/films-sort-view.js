import AbstractView from '../framework/view/abstract-view.js';

const createSortElement = () => `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--default sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button sort__button--date">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--rating">Sort by rating</a></li>
  </ul>`;

export default class FilmsSortView extends AbstractView {
  #films = null;
  #defaultSortButton = null;
  #dateSortButton = null;
  #ratingSortButton = null;
  #sortButtons = null;
  #activeButtonClass = 'sort__button--active';

  constructor(films) {
    super();
    this.#films = films;
    this.#defaultSortButton = this.element.querySelector('.sort__button--default');
    this.#dateSortButton = this.element.querySelector('.sort__button--date');
    this.#ratingSortButton = this.element.querySelector('.sort__button--rating');
    this.#sortButtons = this.element.children;
  }

  get template () {
    return createSortElement();
  }

  #removeActiveButtonClass = () => {
    for (const sortButton of this.#sortButtons) {
      if (sortButton.children[0].classList.contains('sort__button--active')) {
        sortButton.children[0].classList.remove('sort__button--active');
        return;
      }
    }
  };

  setSortButtonsHandlers = (defaultSort, daySort, ratingSort) => {
    this._callback.defaultSort = defaultSort;
    this._callback.daySort = daySort;
    this._callback.ratingSort = ratingSort;
    this.#defaultSortButton.addEventListener('click', this.#onDefaultSortButtonClick);
    this.#dateSortButton.addEventListener('click', this.#onDaySortButtonClick);
    this.#ratingSortButton.addEventListener('click', this.#onRatingSortButtonClick);
  };

  #onDefaultSortButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#defaultSortButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#removeActiveButtonClass();
    this._callback.defaultSort(this.#films, this.#defaultSortButton, this.#activeButtonClass);
  };

  #onDaySortButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#dateSortButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#removeActiveButtonClass();
    this._callback.daySort(this.#films, this.#dateSortButton, this.#activeButtonClass);
  };

  #onRatingSortButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#ratingSortButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#removeActiveButtonClass();
    this._callback.ratingSort(this.#films, this.#ratingSortButton, this.#activeButtonClass);
  };
}
