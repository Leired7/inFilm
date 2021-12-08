import { render, screen } from '@testing-library/react';
import React from 'react';

import { HomeFilmCard } from '../HomeFilmCard';
describe('En las tarjetas de películas de la home se muestra la suguiente información', () => {
  it('Muestra el título de la película', () => {
    render(<HomeFilmCard />);
  });
});
