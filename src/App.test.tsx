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
