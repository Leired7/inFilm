import { InfoFromFilm } from '../../../domain/model';

export interface ApiResponse {
  cleanData: InfoFromFilm[];
  status: number;
}
