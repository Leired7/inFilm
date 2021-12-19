import { Genre } from './Genre';
export interface InfoFromFilm {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  overview: string;
  genres?: Genre[];
}
