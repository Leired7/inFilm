import { InfoFromFilm } from '../domain/model';
import { FilmRepository } from '../domain/model/FilmRepository';
import { Api } from './Api/Api';

export class ApiRepository implements FilmRepository {
  async fetchAll(): Promise<InfoFromFilm[]> {
    const filmsInfo: InfoFromFilm[] = await Api.getAllFilms();
    return filmsInfo;
  }
}
