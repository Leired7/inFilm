import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import popularFilms from './mocks/popular_movie.json';
import genres from './mocks/genre_es.json';

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

describe('Histroria de usuarie 3: "COMO usuarie QUIERO poder ver más información sobre la películ PARA poder elegir mejor que ver"', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it('Muestra el título de la película en el componente `FilmCardInformation`', async () => {
    //arrange
    const filmName = /Ciao Alberto/i;
    const filmImage = await screen.findByRole('img', { name: filmName });

    //act
    userEvent.click(filmImage);

    //assert
    expect(
      screen.getByRole('heading', { name: filmName, level: 1 })
    ).toBeInTheDocument();
  });

  it('Muestra los géneros de la película en el componente `FilmCardInformation`', async () => {
    //arrange
    const filmName = popularFilms.results[3].title;
    const filmGenreIds = popularFilms.results[3].genre_ids;

    const filmGenres = filmGenreIds.map((id) => {
      return genres.genres.filter((item) => id === item.id);
    });

    const filmGenresList = filmGenres.flat();

    const genreName = /Géneros/i;

    //act
    const filmImage = await screen.findByRole('img', { name: filmName });

    userEvent.click(filmImage);

    //assert
    const genreList = await screen.findByRole('list', { name: genreName });

    const { getAllByRole } = within(genreList);

    const items = getAllByRole('listitem');

    const genresWordsInScreen = items.map((item) => item.textContent);
    const genresWords = filmGenresList.map((genre) => genre.name);

    expect(genresWordsInScreen).toEqual([...genresWords]);
  });

  it('Muestra un link en el componente `FilmCardInformation` para volver a la home', async () => {
    //arrange
    const filmName = /Ciao Alberto/i;
    const filmImage = await screen.findByRole('img', { name: filmName });
    const homeLink = 'Volver a la página principal';

    //act
    userEvent.click(filmImage);

    //assert
    screen.getByRole('link', { name: homeLink });
  });
});
