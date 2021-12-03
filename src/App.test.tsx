import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('No muestra las 50 pelis más vistas', () => {
  render(<App />);
  const dontShowMessage = screen.getByText(
    /no se han podido mostrar las 50 películas más vistas/i
  );
  expect(dontShowMessage).toBeInTheDocument();
});
/* https://api.themoviedb.org/3/movie/popular?api_key=c26503d6621bb57cec7e2471ff7814d4&language=es */
test('Muestra la caratula de la película "Venom: Habrá Matanza"', () => {
  render(<App />);

  const filmCover = screen.getByRole('img', {
    name: /Venom: Habrá Matanza/i,
  });

  const dontShowMessage = screen.getByText(
    /no se han podido mostrar las 50 películas más vistas/i
  );
  expect(filmCover).toBeInTheDocument();
  expect(dontShowMessage).not.toBeInTheDocument();
});
