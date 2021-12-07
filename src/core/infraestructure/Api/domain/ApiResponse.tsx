import { InfoFromFilm } from '../../../domain/model';

export interface ApiResponse {
  results: InfoFromFilm[];
  status: number;
}
