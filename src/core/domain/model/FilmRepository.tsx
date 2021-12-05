import { InfoFromFilm } from './InfoFromFilm';

export interface FilmRepository {
  fetchAll: () => Promise<InfoFromFilm[]>;
}
