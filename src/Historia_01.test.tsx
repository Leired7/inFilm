import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import popularFilms from './core/infraestructure/data/popular_movie.json';
import genres from './core/domain/object_value/genre_es.json';

import { server } from './mocks/server';
import { rest } from 'msw';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('Historia de usuarie 1: "COMO usuarie QUIERO poder ver la portada de las 20 pelis más vistas PARA elegir pelis para echar la siesta"', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it('Mientras cargan las imágenes se muestra un mensaje de "Cargando..."', () => {
    const loadingMessage = /Cargando.../i;

    screen.queryByText(loadingMessage);
  });
  it('No muestra las 20 pelis más vistas', async () => {
    server.use(
      rest.get(
        'https://api.themoviedb.org/3/movie/popular',
        (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ error: 'Server Error' }));
        }
      )
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const dontShowMessage =
      /no se han podido mostrar las 20 películas más vistas/i;

    await screen.findByText(dontShowMessage);
  });
  it('Muestra la carátula de las 20 películas más vistas', async () => {
    for (let film of popularFilms.results) {
      await screen.findByRole('img', {
        name: `${film.title}`,
      });
    }
  });
});
