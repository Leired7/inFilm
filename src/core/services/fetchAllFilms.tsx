import { InfoFromFilm, FilmRepository } from '../domain/model';

export async function fetchAllFilms(
  filmRepository: FilmRepository
): Promise<InfoFromFilm[]> {
  return await filmRepository.fetchAll();
}
