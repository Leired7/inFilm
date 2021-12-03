import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import popularFilms from './mocks/popular_movie.json';

test('No muestra las 50 pelis más vistas', () => {
  render(<App />);
  const dontShowMessage = screen.getByText(
    /no se han podido mostrar las 50 películas más vistas/i
  );
  expect(dontShowMessage).toBeInTheDocument();
});

test('Muestra la carátula de las 20 películas más vistas', async () => {
  render(<App />);

  for (let film of popularFilms.results) {
    await screen.findByRole('img', {
      name: `${film.title}`,
    });
  }
});
