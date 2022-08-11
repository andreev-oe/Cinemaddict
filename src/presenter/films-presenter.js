import {
  FILM_CARDS_AMOUNT,
  EXTRA_CARDS_AMOUNT,
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
import {
  render,
  RenderPosition,
} from '../render.js';


export default class FilmsPresenter {
  filmsMainContainerComponent = new FilmsContainerView();
  filmsListSectionComponent = new FilmsListSectionView();
  filmContainerComponent = new FilmsListContainerView();
  init = (headerContainer, mainContainer) => {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
    render(new ProfileView(), this.headerContainer, RenderPosition.BEFOREEND);
    render(new NavigationView(), this.mainContainer, RenderPosition.BEFOREEND);
    render(new FilmsSortView(), this.mainContainer, RenderPosition.BEFOREEND);
    render(this.filmsMainContainerComponent, this.mainContainer, RenderPosition.BEFOREEND);
    render(this.filmsListSectionComponent, this.filmsMainContainerComponent.getElement(), RenderPosition.BEFOREEND);
    render(this.filmContainerComponent, this.filmsListSectionComponent.getElement(), RenderPosition.BEFOREEND);
    for (let i = 0; i < FILM_CARDS_AMOUNT; i++) {
      render(new FilmCardView(), this.filmContainerComponent.getElement(), RenderPosition.BEFOREEND);
    }
    render(new ShowMoreButtonView(), this.filmsMainContainerComponent.getElement(), RenderPosition.BEFOREEND);
    for (let i = 0; i < EXTRA_CARDS_AMOUNT; i++) {
      this.filmsListExtraContainerComponent = new FilmsListContainerView();
      this.filmsListExtraSectionComponent = new FilmsListExtraSectionView();
      render(this.filmsListExtraSectionComponent, this.filmsMainContainerComponent.getElement(), RenderPosition.BEFOREEND);
      render(this.filmsListExtraContainerComponent, this.filmsListExtraSectionComponent.getElement(), RenderPosition.BEFOREEND);
      for (let j = 0; j < EXTRA_CARDS_AMOUNT; j++) {
        render(new FilmCardView(), this.filmsListExtraContainerComponent.getElement(), RenderPosition.BEFOREEND);
      }
    }
  };
}
