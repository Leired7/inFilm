import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import popularFilms from './mocks/popular_movie.json';
import { server } from './mocks/server';
import { rest } from 'msw';

describe('Historia de usuarie 1: "poder ver la portada de las 20 pelis más vistas para elegir pelis para echar la siesta"', () => {
  test('Mientras cargan las imágenes se muestra un mensaje de "Cargando..."', () => {
    render(<App />);

    const loadingMessage = /Cargando.../i;

    screen.queryByText(loadingMessage);
  });
  test('No muestra las 50 pelis más vistas', () => {
    server.use(
      rest.get(
        'https://api.themoviedb.org/3/movie/popular',
        (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ error: 'Server Error' }));
        }
      )
    );

    render(<App />);

    const dontShowMessage =
      /no se han podido mostrar las 50 películas más vistas/i;

    screen.queryByText(dontShowMessage);
  });
  test('Muestra la carátula de las 20 películas más vistas', async () => {
    render(<App />);

    for (let film of popularFilms.results) {
      await screen.findByRole('img', {
        name: `${film.title}`,
      });
    }
  });
});
