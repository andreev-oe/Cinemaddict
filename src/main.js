import FilmsPresenter from './presenter/films-presenter.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const filmsPresenter = new FilmsPresenter();

filmsPresenter.init(headerElement, mainElement);
