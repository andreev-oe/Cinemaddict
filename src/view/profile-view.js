import AbstractView from '../framework/view/abstract-view.js';
import {
  ProfileRating,
  ProfileRatingGrade
} from '../constants.js';

const createProfileElement = (films) => {
  let grade;
  const watchedFilms = films.filter((film) => film.userDetails.alreadyWatched).length;
  if (watchedFilms > ProfileRatingGrade.NONE && watchedFilms <= ProfileRatingGrade.NOVICE) {
    grade = ProfileRating.NOVICE;
  } else if (watchedFilms > ProfileRatingGrade.NOVICE && watchedFilms <= ProfileRatingGrade.FAN) {
    grade = ProfileRating.FAN;
  } else if (watchedFilms >= ProfileRatingGrade.MOVIE_BUFF) {
    grade = ProfileRating.MOVIE_BUFF;
  } else {
    grade = ProfileRating.NONE;
  }
  return `<section class="header__profile profile">
    <p class="profile__rating">${grade}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class ProfileView extends AbstractView {
  #films = null;
  constructor(films) {
    super();
    this.#films = films;
  }

  get template () {
    return createProfileElement(this.#films);
  }
}
