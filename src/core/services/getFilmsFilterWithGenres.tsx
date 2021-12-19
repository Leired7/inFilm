import { InfoFromFilm } from '../domain/model';

import { getGenresFromIds } from './getGenresFromIds';

export const getFilmsFilterwithGenres = (
  userTypeString: string,
  fetchedFilms: InfoFromFilm[]
) => {
  const formatedFilter: string = userTypeString
    .split(' ')
    .filter((substring: string) => substring)
    .join(' ')
    .toLowerCase();

  const filteredFilms: InfoFromFilm[] = fetchedFilms.filter(
    (item: InfoFromFilm, index: number) => {
      const minimumCaractersToSearch = 3;

      if (formatedFilter.length >= minimumCaractersToSearch) {
        return item.title.toLowerCase().includes(formatedFilter);
      }
      return item;
    }
  );

  const filmsWithGenres = getGenresFromIds(filteredFilms);

  return { filmsWithGenres, formatedFilter };
};
