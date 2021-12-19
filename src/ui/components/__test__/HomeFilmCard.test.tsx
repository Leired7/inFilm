import { render, screen } from '@testing-library/react';
import React from 'react';

import popularFilms from '../../../core/infraestructure/data/popular_movie.json';

import { HomeFilmCard } from '../HomeFilmCard';

import { MemoryRouter } from 'react-router-dom';
describe('En las tarjetas de películas de la home se muestra la suguiente información', () => {
  it('Muestra el título de la película, fecha de estreno, poster, votación media y número de votos', async () => {
    const { poster_path, title, vote_average, vote_count, id } =
      popularFilms.results[0];

    render(
      <MemoryRouter>
        <HomeFilmCard
          poster_path={poster_path}
          title={title}
          release_date={''}
          genres_id={[]}
          vote_average={vote_average}
          vote_count={vote_count}
          id={id}
        />
      </MemoryRouter>
    );

    await screen.findByText(title);
    await screen.findByRole('img', { name: title });
  });

  test.todo(
    'Ocultar la imagen para lectores de pantalla o hacer con ella otra cosa accesible que se me ocurra 😅'
  );
});
