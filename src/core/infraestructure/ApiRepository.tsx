import { InfoFromFilm } from '../dominio/model';
import { FilmRepository } from '../dominio/model/FilmRepository';
import { Api } from './Api/Api';

export class ApiRepository implements FilmRepository {
  async fetchAll(): Promise<InfoFromFilm[]> {
    const filmsInfo: InfoFromFilm[] = await Api.getAllFilms();
    return filmsInfo;
  }
}
