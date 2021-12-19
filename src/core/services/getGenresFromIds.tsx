import { InfoFromFilm } from '../domain/model';
import { Genre } from '../domain/model';

import genres from '../../mocks/genre_es.json';

export const getGenresFromIds = (films: InfoFromFilm[]) => {
  for (let film of films) {
    const commonId = film.genre_ids.map((id) =>
      genres.genres.filter((item) => id === item.id)
    );

    const commonIdString: Genre[] = commonId.flat();

    film.genres = [...commonIdString];
  }

  return films;
};
