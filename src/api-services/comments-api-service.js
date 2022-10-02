import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class CommentsApiService extends ApiService {
  comments(film) {
    return this._load({url: `comments/${film.id}`})
      .then(ApiService.parseResponse);
  }

  updateComments = async (film) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.adaptToClient(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  adaptToClient = (comments) => [...comments];
}
