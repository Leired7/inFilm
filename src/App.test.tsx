import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import App from './App';

describe('QUIÉN La usuaria QUIERE ver más tipos de listas de películas PARA tener elegir entre más opciones', () => {
  it('Al cargar la home no se verá la lista de las "ahora en las salas"', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const dontShowMessage =
      /no se han podido mostrar las películas que están ahora mismo en salas/i;

    await screen.findByText(dontShowMessage);
  });
});
