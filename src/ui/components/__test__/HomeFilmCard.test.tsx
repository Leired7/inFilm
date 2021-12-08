import { render, screen } from '@testing-library/react';
import React from 'react';

import { HomeFilmCard } from '../HomeFilmCard';
describe('En las tarjetas de películas de la home se muestra la suguiente información', () => {
  it('Muestra el título de la película', async () => {
    const title = 'Shang-Chi y la leyenda de los Diez Anillos';
    render(
      <HomeFilmCard
        poster_path={''}
        title={title}
        release_date={''}
        genres_id={[]}
        vote_average={0}
        vote_count={0}
      />
    );

    await screen.findByText(title);
  });
});
