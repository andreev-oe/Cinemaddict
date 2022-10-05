import AbstractView from '../framework/view/abstract-view.js';

const createSortElement = (films) => {
  if (films) {
    return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--default sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button sort__button--date">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--rating">Sort by rating</a></li>
  </ul>`;
  }
};

export default class FilmsSortView extends AbstractView {
  #films = null;
  #srcFilms = null;
  #defaultSortButton = null;
  #dateSortButton = null;
  #ratingSortButton = null;
  #sortButtons = null;
  #activeButtonClass = 'sort__button--active';
  #shownFilmCards = [];

  constructor(films) {
    super();
    this.#films = films;
    this.#srcFilms = films;
  }

  get template () {
    return createSortElement(this.#films);
  }

  get showedFilms () {
    return this.#shownFilmCards;
  }

  get defaultSort () {
    return this.#onDefaultSortButtonClick;
  }

  #removeActiveButtonClass = () => {
    for (const sortButton of this.#sortButtons) {
      if (sortButton.children[0].classList.contains('sort__button--active')) {
        sortButton.children[0].classList.remove('sort__button--active');
        return;
      }
    }
  };

  #clearContent = (thisContent) => {
    thisContent.#shownFilmCards.forEach((filmCard) => filmCard.destroy());
    thisContent.#shownFilmCards = [];
    thisContent.#removeActiveButtonClass();
  };

  setSortButtonsHandlers = (defaultSort, daySort, ratingSort, init, shownFilmCards, filteredFilms) => {
    this._callback.defaultSort = defaultSort;
    this._callback.daySort = daySort;
    this._callback.ratingSort = ratingSort;
    this._callback.filmsInit = init;
    this.#shownFilmCards = shownFilmCards;
    this.#films = filteredFilms;
    this.#defaultSortButton = this.element.querySelector('.sort__button--default');
    this.#dateSortButton = this.element.querySelector('.sort__button--date');
    this.#ratingSortButton = this.element.querySelector('.sort__button--rating');
    this.#sortButtons = this.element.children;
    this.#defaultSortButton.addEventListener('click', this.#onDefaultSortButtonClick);
    this.#dateSortButton.addEventListener('click', this.#onDaySortButtonClick);
    this.#ratingSortButton.addEventListener('click', this.#onRatingSortButtonClick);
  };

  #onDefaultSortButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#defaultSortButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#clearContent(this);
    const filteredFilms = this._callback.defaultSort(this.#srcFilms, this.#films, this.#defaultSortButton, this.#activeButtonClass);
    this._callback.filmsInit(filteredFilms);
  };

  #onDaySortButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#dateSortButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#clearContent(this);
    const filteredFilms = this._callback.daySort(this.#films, this.#dateSortButton, this.#activeButtonClass);
    this._callback.filmsInit(filteredFilms);
  };

  #onRatingSortButtonClick = (evt) => {
    evt.preventDefault();
    if (this.#ratingSortButton.classList.contains(this.#activeButtonClass)) {
      return;
    }
    this.#clearContent(this);
    const filteredFilms = this._callback.ratingSort(this.#films, this.#ratingSortButton, this.#activeButtonClass);
    this._callback.filmsInit(filteredFilms);
  };
}
