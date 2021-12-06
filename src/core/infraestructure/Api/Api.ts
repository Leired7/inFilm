import { InfoFromFilm } from '../../domain/model';

export const Api = {
  getAllFilms: async (): Promise<InfoFromFilm[]> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=es`
    );
    const data = await response.json();

    return data.results;
  },
};
