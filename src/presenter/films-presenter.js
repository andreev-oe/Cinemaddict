import {
  EXTRA_FILMS_CARDS_AMOUNT, TEMP_TITLES,
} from '../constants.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListExtraSectionView from '../view/films-list-extra-section-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsSortView from '../view/films-sort-view.js';
import NavigationView from '../view/navigation-view.js';
import ProfileView from '../view/profile-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import {render} from '../render.js';
import {getRandomInteger} from '../utilities.js';

export default class FilmsPresenter {
  filmsMainContainerComponent = new FilmsContainerView();
  filmsListSectionComponent = new FilmsListSectionView();
  filmContainerComponent = new FilmsListContainerView();
  init = (headerContainer, mainContainer, filmsModel) => {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
    this.filmsModel = filmsModel;
    this.films = [...filmsModel.films];
    this.comments = [...filmsModel.comments];
    render(new ProfileView(), this.headerContainer);
    render(new NavigationView(), this.mainContainer);
    render(new FilmsSortView(), this.mainContainer);
    render(this.filmsMainContainerComponent, this.mainContainer);
    render(this.filmsListSectionComponent, this.filmsMainContainerComponent.getElement());
    render(this.filmContainerComponent, this.filmsListSectionComponent.getElement());
    for (let i = 0; i < filmsModel.films.length; i++) {
      render(new FilmCardView(this.films[i], this.comments[i]), this.filmContainerComponent.getElement());
    }
    render(new ShowMoreButtonView(), this.filmsMainContainerComponent.getElement());
    for (let i = 0; i < EXTRA_FILMS_CARDS_AMOUNT; i++) {
      this.filmsListExtraContainerComponent = new FilmsListContainerView();
      this.filmsListExtraSectionComponent = new FilmsListExtraSectionView();
      render(this.filmsListExtraSectionComponent, this.filmsMainContainerComponent.getElement());
      render(this.filmsListExtraContainerComponent, this.filmsListExtraSectionComponent.getElement());
      for (let j = 0; j < EXTRA_FILMS_CARDS_AMOUNT; j++) {
        render(new FilmCardView(this.films[i], this.comments[i]), this.filmsListExtraContainerComponent.getElement());
      }
    }
    render(new FilmPopupView(this.films[getRandomInteger(0, TEMP_TITLES.length - 1)], this.comments), this.mainContainer);
  };
}
