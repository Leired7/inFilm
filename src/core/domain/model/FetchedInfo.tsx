import { InfoFromFilm } from './InfoFromFilm';

export interface FetchedInfo {
  error: boolean;
  loading: boolean;
  filteredFilms: InfoFromFilm[];
  formatedFilter: string;
}
