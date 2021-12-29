import { FilmRepository } from '../domain/model';
import { ApiResponse } from '../infraestructure/Api/domain';

export async function fetchAllPopularFilms(
  filmRepository: FilmRepository
): Promise<ApiResponse> {
  return await filmRepository.fetchAllPopularFilms();
}
