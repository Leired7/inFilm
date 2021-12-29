// src/mocks/handlers.js
import { rest } from 'msw';
import popularMovie from '../core/infraestructure/data/popular_movie.json';
import nowPlayingMovie from '../mocks/nowPlayingFilms_es.json';

export const handlers = [
  rest.get('https://api.themoviedb.org/3/movie/popular', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(popularMovie));
  }),
  rest.get(
    'https://api.themoviedb.org/3/movie/now_playing',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(nowPlayingMovie));
    }
  ),
];
