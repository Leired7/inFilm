import { render, screen } from '@testing-library/react';
import React from 'react';

import { Navigation } from '../Navigation';

describe('Comprueba que están todos los elementos', () => {
  it('Tiene que aparecer el Logo', () => {
    render(<Navigation />);

    screen.getByRole('img', { name: 'Logo de inFilm' });
  });
});
