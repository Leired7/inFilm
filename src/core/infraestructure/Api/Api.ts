import { InfoFromFilm } from '../../domain/model';

export const Api = {
  getAllFilms: async (): Promise<InfoFromFilm[]> => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular`);
    const data = await response.json();

    return data.results;
  },
};
