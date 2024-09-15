import { ApiResponse } from '../../infraestructure/Api/domain';
export interface FilmRepository {
  fetchAllPopularFilms: () => Promise<ApiResponse>;
}
