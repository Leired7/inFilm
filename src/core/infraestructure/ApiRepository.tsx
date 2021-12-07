import { FilmRepository } from '../domain/model/FilmRepository';
import { Api, apiResponse } from './Api/Api';

export class ApiRepository implements FilmRepository {
  async fetchAll(): Promise<apiResponse> {
    const filmsInfo: apiResponse = await Api.getAllFilms();

    return filmsInfo;
  }
}
