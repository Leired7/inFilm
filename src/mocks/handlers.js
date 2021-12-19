// src/mocks/handlers.js
import { rest } from 'msw';

import popularMovie from '../core/infraestructure/data/popular_movie.json';

export const handlers = [
  rest.get('https://api.themoviedb.org/3/movie/popular', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(popularMovie));
  }),
];
