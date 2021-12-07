import { apiResponse } from './../../infraestructure/Api/Api';
export interface FilmRepository {
  fetchAll: () => Promise<apiResponse>;
}
