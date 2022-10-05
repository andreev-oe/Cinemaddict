/**
 * Класс для отправки запросов к серверу
 */
export default class ApiService {
  /**
   * @param {string} endPoint Адрес сервера
   * @param {string} authorization Авторизационный токен
   */
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  /**
   * Метод для отправки запроса к серверу
   * @param {Object} config Объект с настройками
   * @param {string} config.url Адрес относительно сервера
   * @param {string} [config.method] Метод запроса
   * @param {string} [config.body] Тело запроса
   * @param {Headers} [config.headers] Заголовки запроса
   * @returns {Promise<Response>}
   */
  _load = async ({
    url,
    method = 'GET',
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this._authorization);

    const response = await fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  };

  /**
   * Метод для обработки ответа
   * @param {Response} response Объект ответа
   * @returns {Promise<JSON>}
   */
  static parseResponse = (response) => response.json();

  /**
   * Метод для проверки ответа
   * @param {Response} response Объект ответа
   */
  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  /**
   * Метод для обработки ошибок
   * @param {Error} err Объект ошибки
   */
  static catchError = (err) => {
    throw err;
  };

  adaptFilmToClient = (film) => {
    const adaptedFilm = {
      ...film,
      filmInfo: {
        ...film.film_info,
        ageRating: film.film_info.age_rating,
        alternativeTitle: film.film_info.alternative_title,
        totalRating: film.film_info.total_rating,
        release: {
          releaseCountry: film.film_info.release.release_country,
          date: film.film_info.release.date
        },
      },
      userDetails: {
        ...film.user_details,
        alreadyWatched: film.user_details.already_watched,
        watchingDate: film.user_details.watching_date,
      },
    };
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;
    delete adaptedFilm.filmInfo.age_rating;
    delete adaptedFilm.filmInfo.alternative_title;
    delete adaptedFilm.filmInfo.total_rating;
    delete adaptedFilm.filmInfo.release.release_country;
    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watching_date;

    return adaptedFilm;
  };

  adaptFilmToServer = (film) => {
    const adaptedFilm = {
      ...film,
      'film_info': {
        ...film.filmInfo,
        'age_rating': film.filmInfo.ageRating,
        'alternative_title': film.filmInfo.alternativeTitle,
        'total_rating': film.filmInfo.totalRating,
        release: {
          'release_country': film.filmInfo.release.releaseCountry,
          'date': film.filmInfo.release.date
        },
      },
      'user_details': {
        ...film.userDetails,
        'already_watched': film.userDetails.alreadyWatched,
        'watching_date': film.userDetails.watchingDate,
      },
    };
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;
    delete adaptedFilm.film_info.ageRating;
    delete adaptedFilm.film_info.alternativeTitle;
    delete adaptedFilm.film_info.totalRating;
    delete adaptedFilm.film_info.release.releaseCountry;
    delete adaptedFilm.user_details.alreadyWatched;
    delete adaptedFilm.user_details.watchingDate;
    return adaptedFilm;
  };

  adaptCommentToClient = (comments) => [...comments];
}
