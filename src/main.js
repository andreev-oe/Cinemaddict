import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import './temp-data/temp.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const filmsPresenter = new FilmsPresenter();
const filmsModel = new FilmsModel();

filmsPresenter.init(headerElement, mainElement, filmsModel);

// Добавил временно чтобы можно было открыть/закрыть попап
const popupElement = document.querySelector('.film-details');
const closePopupButtonElement = popupElement.querySelector('.film-details__close-btn');

const showPopup = (evt) => {
  if (evt.target.nodeName === 'IMG'){
    popupElement.classList.remove('visually-hidden');
  }
};

const closePopup = () => {
  popupElement.classList.add('visually-hidden');
};

closePopupButtonElement.addEventListener('click', closePopup);
document.body.addEventListener('click', showPopup);
