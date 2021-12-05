import { InfoFromFilm, FilmRepository } from '../dominio/model';

export async function fetchAllFilms(
  filmRepository: FilmRepository
): Promise<InfoFromFilm[]> {
  return await filmRepository.fetchAll();
}
