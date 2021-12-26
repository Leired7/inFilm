import { render, screen, within } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import popularFilms from './core/infraestructure/data/popular_movie.json';
import { server } from './mocks/server';

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
    const mostPopularFilms = /Películas más vistas/i;

    const popularFilmsList = await screen.findByRole('list', {
      name: mostPopularFilms,
    });

    const { findAllByRole } = within(popularFilmsList);

    const items = await findAllByRole('listitem');

    const postersInScreen = items.map((item) => item.title);
    const popularFilmsItems = popularFilms.results.map((item) => item.title);

    for (let i = 0; i < postersInScreen.length; i++) {
      expect(postersInScreen[i]).toContain(popularFilmsItems[i]);
    }
  });
});
