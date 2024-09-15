import { render, screen, within } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import nowPlayingMovie from './mocks/nowPlayingFilms_es.json';
import { server } from './mocks/server';

describe('QUIÉN La usuaria QUIERE ver más tipos de listas de películas PARA tener elegir entre más opciones', () => {
  it('Al cargar la home no se verá la lista de las películas "en cartelera"', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    server.use(
      rest.get(
        'https://api.themoviedb.org/3/movie/now_playing',
        (req, res, ctx) => {
          return res(ctx.status(401), ctx.json({ error: 'Server Error' }));
        }
      )
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const dontShowMessage =
      /No se han podido mostrar las 20 películas en cartelera/i;

    await screen.findByText(dontShowMessage);
  });

  it('Muestra el título de las 20 películas en cartelera', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const nowPlayingFilms = /Películas en cartelera/i;

    const nowPlayingFilmsList = await screen.findByRole('list', {
      name: nowPlayingFilms,
    });

    const { findAllByRole } = within(nowPlayingFilmsList);

    const items = await findAllByRole('listitem');

    const postersInScreen = items.map((item) => item.title);
    const nowPlayingFilmsItems = nowPlayingMovie.results.map(
      (item) => item.title
    );

    for (let i = 0; i < postersInScreen.length; i++) {
      await expect(postersInScreen[i]).toContain(nowPlayingFilmsItems[i]);
    }
  });
});
