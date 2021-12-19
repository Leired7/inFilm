import { ApiResponse } from './domain';

const API_URL = `https://api.themoviedb.org/3/`;

const MOVIES_LIST = 'popular';

export const Api = {
  getAllPopularFilms: async (): Promise<ApiResponse> => {
    const response = await fetch(
      `${API_URL}movie/${MOVIES_LIST}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=es`
    );
    const data = await response.json();

    const results: [] = data.results;
    const status = response.status;

    return { results, status };
  },
};
