import { InfoFromFilm } from '../../domain/model';

export interface apiResponse {
  cleanData: InfoFromFilm[];
  status: number;
}
export const Api = {
  getAllFilms: async (): Promise<apiResponse> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=es`
    );
    const data = await response.json();

    const cleanData: [] = data.results;
    const status = response.status;

    return { cleanData, status };
  },
};
