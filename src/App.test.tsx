import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import popularFilms from './mocks/popular_movie.json';
import { server } from './mocks/server';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

describe('Historia de usuarie 1: "COMO usuarie QUIERO poder ver la portada de las 20 pelis más vistas PARA elegir pelis para echar la siesta"', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('Mientras cargan las imágenes se muestra un mensaje de "Cargando..."', () => {
    const loadingMessage = /Cargando.../i;

    screen.queryByText(loadingMessage);
  });
  it('No muestra las 50 pelis más vistas', () => {
    server.use(
      rest.get(
        'https://api.themoviedb.org/3/movie/popular',
        (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ error: 'Server Error' }));
        }
      )
    );

    const dontShowMessage =
      /no se han podido mostrar las 50 películas más vistas/i;

    screen.queryByText(dontShowMessage);
  });
  it('Muestra la carátula de las 20 películas más vistas', async () => {
    for (let film of popularFilms.results) {
      await screen.findByRole('img', {
        name: `${film.title}`,
      });
    }
  });
});

describe('Historias de usuarie 2: "COMO usuarie QUIERO poder buscar las pelis que me interesan PARA compartirlas en mis redes sociales', () => {
  let searchInput: any;
  beforeEach(() => {
    render(<App />);

    const labelText = /¿Qué quieres buscar hoy?/i;
    screen.getByLabelText(labelText);

    searchInput = screen.getByPlaceholderText(labelText);
  });
  it('Muestra mensaje si el término de búsqueda es inferior a 3 caracteres.', () => {
    userEvent.type(searchInput, 'l');

    screen.getByText('Hacen falta 3 carácteres para iniciar la búsqueda... 😉');
  });

  it('El término de búsqueda tiene una longitud superior o igual a 3 caracteres.', async () => {
    userEvent.type(searchInput, 'Shang-Chi y la leyenda de los Diez Anillos');

    const images = await screen.findAllByRole('img');

    expect(images.length).toBe(1);
  });

  it('No hay pelis cuya etiqueta coincida exactamente con el término de búsqueda', async () => {
    userEvent.type(searchInput, 'Alien');

    screen.getByText('Ohhhh no encontramos lo que buscabas 😔');
  });

  it('Serán parte del resultado de búsqueda aquellas pelis donde la etiqueta coincida parcialmente con el término de búsqueda', async () => {
    userEvent.type(searchInput, 'roj');

    const images = await screen.findAllByRole('img');

    expect(images.length).toBe(2);
  });

  it('Se ignoran los espacios laterales y los espacios interiores mayores que 1 del término de búsqueda.', async () => {
    userEvent.type(searchInput, '  roj');

    const images = await screen.findAllByRole('img');

    expect(images.length).toBe(2);
  });

  it('R4.1: Los espacios laterales superiores a 1 no cuentan como caracteres para calcular la longitud de la cadena de búsqueda.', async () => {
    userEvent.type(searchInput, '   f ');

    screen.getByText(
      'Hacen falta 3 carácteres diferentes al espacio para iniciar la búsqueda... 😉'
    );
  });

  it('R4.2: Los espacios interiores superiores a 1 no cuentan como caracteres para calcular la longitud de la cadena de búsqueda.', async () => {
    userEvent.type(searchInput, '   a    le    ');

    const images = await screen.findAllByRole('img', {
      name: 'Shang-Chi y la leyenda de los Diez Anillos',
    });

    expect(images.length).toBe(1);
  });

  it('Se ignoran mayúsculas y minúsuclas', async () => {
    userEvent.type(searchInput, 'LeyENdA');

    const images = await screen.findAllByRole('img', {
      name: 'Shang-Chi y la leyenda de los Diez Anillos',
    });

    expect(images.length).toBe(1);
  });
});
