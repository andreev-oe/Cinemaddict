import FilmsPresenter from './presenter/films-presenter.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');

const filmsPresenter = new FilmsPresenter();

filmsPresenter.init(header, main);
