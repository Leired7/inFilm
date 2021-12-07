import { FilmRepository } from '../domain/model';
import { ApiResponse } from '../infraestructure/Api/domain';

export async function fetchAllFilms(
  filmRepository: FilmRepository
): Promise<ApiResponse> {
  return await filmRepository.fetchAll();
}
