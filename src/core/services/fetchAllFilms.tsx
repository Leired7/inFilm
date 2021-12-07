import { FilmRepository } from '../domain/model';
import { apiResponse } from '../infraestructure/Api/Api';

export async function fetchAllFilms(
  filmRepository: FilmRepository
): Promise<apiResponse> {
  return await filmRepository.fetchAll();
}
