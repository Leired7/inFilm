import { ApiResponse } from './domain';

export const Api = {
  getAllFilms: async (): Promise<ApiResponse> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=es`
    );
    const data = await response.json();

    const cleanData: [] = data.cleanData;
    const status = response.status;

    return { cleanData, status };
  },
};
