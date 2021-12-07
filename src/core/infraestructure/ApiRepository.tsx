import { FilmRepository } from '../domain/model/FilmRepository';
import { Api } from './Api/Api';
import { ApiResponse } from './Api/domain';

export class ApiRepository implements FilmRepository {
  async fetchAll(): Promise<ApiResponse> {
    const filmsInfo: ApiResponse = await Api.getAllFilms();

    return filmsInfo;
  }
}
