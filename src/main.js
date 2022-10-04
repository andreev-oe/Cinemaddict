import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FiltersModel from './model/filters-model.js';
import FilmsApiService from './api-services/films-api-service.js';
import {UpdateType} from './constants.js';
import CommentsApiService from './api-services/comments-api-service.js';

const AUTHORIZATION = 'Basic asdjklwer32432jk';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';
const filmsApiService = new FilmsApiService(END_POINT, AUTHORIZATION);
const commentsApiService = new CommentsApiService(END_POINT, AUTHORIZATION);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const filmsModel = new FilmsModel(filmsApiService);
const commentsModel = new CommentsModel(commentsApiService);
const filterModel = new FiltersModel();
const filmsPresenter = new FilmsPresenter(headerElement, mainElement, footerElement, filmsModel, commentsModel, filterModel);

filmsModel.init(UpdateType.INIT);
filmsPresenter.init();
