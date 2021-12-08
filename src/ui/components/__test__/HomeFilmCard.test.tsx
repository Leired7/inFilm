import { render, screen } from '@testing-library/react';
import React from 'react';

import popularFilms from '../../../mocks/popular_movie.json';

import { HomeFilmCard } from '../HomeFilmCard';
describe('En las tarjetas de películas de la home se muestra la suguiente información', () => {
  it('Muestra el título de la película, fecha de estreno, poster, votación media y número de votos', async () => {
    const { poster_path, title, vote_average, vote_count } =
      popularFilms.results[0];

    render(
      <HomeFilmCard
        poster_path={poster_path}
        title={title}
        release_date={''}
        genres_id={[]}
        vote_average={vote_average}
        vote_count={vote_count}
      />
    );

    await screen.findByText(title);
    await screen.findByRole('img', { name: title });
  });
});
