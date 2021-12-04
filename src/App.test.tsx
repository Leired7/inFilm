import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import popularFilms from './mocks/popular_movie.json';
import { server } from './mocks/server';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

describe('Historia de usuarie 1: "COMO usuarie QUIERO poder ver la portada de las 20 pelis más vistas PARA elegir pelis para echar la siesta"', () => {
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

describe('Historias de usuarie 2: "COMO usuarie QUIERO poder buscar las pelis que me interesan PARA compartirlas en mis redes sociales', () => {
  describe('La longitud de un término de búsqueda para que devuelva resultados es de 3 caracteres', () => {
    it('Muestra mensaje si el término de búsqueda es inferior a 3 caracteres.', () => {
      render(<App />);

      const labelText = /¿Qué quieres buscar hoy?/i;
      screen.getByLabelText(labelText);

      const searchInput = screen.getByPlaceholderText(labelText);

      userEvent.type(searchInput, 'l');

      screen.getByText(
        'Hacen falta 3 carácteres para iniciar la búsqueda... ;-)'
      );
    });

    it('El término de búsqueda tiene una longitud superior o igual a 3 caracteres.', async () => {
      render(<App />);
      const labelText = /¿Qué quieres buscar hoy?/i;

      const searchInput = screen.getByPlaceholderText(labelText);

      userEvent.type(searchInput, 'leyenda');

      const images = await screen.findAllByRole('img');

      expect(images.length).toBe(1);
    });
  });
});
