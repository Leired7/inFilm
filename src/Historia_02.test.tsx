import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import popularFilms from './core/infraestructure/data/popular_movie.json';
import genres from './core/domain/object_value/genre_es.json';

import { server } from './mocks/server';
import { rest } from 'msw';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('Historias de usuarie 2: "COMO usuarie QUIERO poder buscar las pelis que me interesan PARA compartirlas en mis redes sociales', () => {
  let searchInput: any;
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const labelText = /Busca para 😴/i;
    screen.getByLabelText(labelText);

    searchInput = screen.getByPlaceholderText(labelText);
  });

  it('El término de búsqueda tiene una longitud superior o igual a 3 caracteres.', async () => {
    const userTypedWord = 'Shang-Chi y la leyenda de los Diez Anillos';

    userEvent.type(searchInput, userTypedWord);

    const images = await screen.findAllByRole('img', {
      name: userTypedWord,
    });

    expect(images.length).toBe(1);
  });

  it('No hay pelis cuya etiqueta coincida exactamente con el término de búsqueda', async () => {
    const userTypedWord = 'Alien';

    userEvent.type(searchInput, userTypedWord);

    screen.getByText('Ohhhh no encontramos lo que buscabas 😔');
  });

  it('Serán parte del resultado de búsqueda aquellas pelis donde la etiqueta coincida parcialmente con el término de búsqueda', async () => {
    const userTypedWord = 'roj';

    userEvent.type(searchInput, userTypedWord);

    const images = await screen.findAllByRole('img', { name: /roj/i });

    expect(images.length).toBe(2);
  });

  it('Se ignoran los espacios laterales y los espacios interiores mayores que 1 del término de búsqueda.', async () => {
    const userTypedWord = '  roj';

    userEvent.type(searchInput, userTypedWord);

    const images = await screen.findAllByRole('img', { name: /roj/i });

    expect(images.length).toBe(2);
  });

  it('R4.1: Los espacios laterales superiores a 1 no cuentan como caracteres para calcular la longitud de la cadena de búsqueda.', async () => {
    const userTypedWord = '   f ';

    userEvent.type(searchInput, userTypedWord);

    screen.getByText(
      'Hacen falta 3 carácteres diferentes al espacio para iniciar la búsqueda... 😉'
    );
  });

  it('R4.2: Los espacios interiores superiores a 1 no cuentan como caracteres para calcular la longitud de la cadena de búsqueda.', async () => {
    const userTypedWord = '   a    le    ';
    const findedFilm = 'Shang-Chi y la leyenda de los Diez Anillos';

    userEvent.type(searchInput, userTypedWord);

    const images = await screen.findAllByRole('img', {
      name: findedFilm,
    });

    expect(images.length).toBe(1);
  });

  it('Se ignoran mayúsculas y minúsculas', async () => {
    const userTypedWord = 'LeyENdA';

    const findedFilm = 'Shang-Chi y la leyenda de los Diez Anillos';

    userEvent.type(searchInput, userTypedWord);

    const images = await screen.findAllByRole('img', {
      name: findedFilm,
    });

    expect(images.length).toBe(1);
  });
});
