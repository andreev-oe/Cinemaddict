import {
  FILM_CARDS_AMOUNT,
  EXTRA_FILMS_CARDS_AMOUNT,
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
import {render} from '../render.js';

export default class FilmsPresenter {
  filmsMainContainerComponent = new FilmsContainerView();
  filmsListSectionComponent = new FilmsListSectionView();
  filmContainerComponent = new FilmsListContainerView();
  init = (headerContainer, mainContainer) => {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
    render(new ProfileView(), this.headerContainer);
    render(new NavigationView(), this.mainContainer);
    render(new FilmsSortView(), this.mainContainer);
    render(this.filmsMainContainerComponent, this.mainContainer);
    render(this.filmsListSectionComponent, this.filmsMainContainerComponent.getElement());
    render(this.filmContainerComponent, this.filmsListSectionComponent.getElement());
    for (let i = 0; i < FILM_CARDS_AMOUNT; i++) {
      render(new FilmCardView(), this.filmContainerComponent.getElement());
    }
    render(new ShowMoreButtonView(), this.filmsMainContainerComponent.getElement());
    for (let i = 0; i < EXTRA_FILMS_CARDS_AMOUNT; i++) {
      this.filmsListExtraContainerComponent = new FilmsListContainerView();
      this.filmsListExtraSectionComponent = new FilmsListExtraSectionView();
      render(this.filmsListExtraSectionComponent, this.filmsMainContainerComponent.getElement());
      render(this.filmsListExtraContainerComponent, this.filmsListExtraSectionComponent.getElement());
      for (let j = 0; j < EXTRA_FILMS_CARDS_AMOUNT; j++) {
        render(new FilmCardView(), this.filmsListExtraContainerComponent.getElement());
      }
    }
  };
}
