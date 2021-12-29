import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import popularFilms from './core/infraestructure/data/popular_movie.json';
import genres from './core/domain/object_value/genre_es.json';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

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
