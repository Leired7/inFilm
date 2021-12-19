import { InfoFromFilm } from '../domain/model';
import { Genre } from '../domain/model';

import genres from '../../mocks/genre_es.json';

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

  const getGenresWord = (films: InfoFromFilm[]) => {
    for (let film of films) {
      const commonId = film.genre_ids.map((id) =>
        genres.genres.filter((item) => id === item.id)
      );

      const commonIdString: Genre[] = commonId.flat();

      film.genres = [...commonIdString];
    }
  };

  getGenresWord(filteredFilms);

  return { filteredFilms, formatedFilter };
};
