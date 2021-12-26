import { InfoFromFilm } from '../domain/model';
import { getGenresFromIds } from './getGenresFromIds';

export const getFilmsFilterwithGenres = (
  userTypeString: string,
  fetchedFilms: InfoFromFilm[]
) => {
  const filteredFilms: InfoFromFilm[] = fetchedFilms.filter(
    (item: InfoFromFilm, index: number) => {
      const minimumCaractersToSearch = 3;

      if (userTypeString.length >= minimumCaractersToSearch) {
        return item.title.toLowerCase().includes(userTypeString);
      }
      return item;
    }
  );

  const filmsWithGenres = getGenresFromIds(filteredFilms);

  return filmsWithGenres;
};
