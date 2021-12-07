import { ApiResponse } from '../../infraestructure/Api/domain';
export interface FilmRepository {
  fetchAll: () => Promise<ApiResponse>;
}
