import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import './temp-data/temp.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const filmsPresenter = new FilmsPresenter();
const filmsModel = new FilmsModel();

filmsPresenter.init(headerElement, mainElement, filmsModel);
