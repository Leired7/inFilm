import { render, screen } from '@testing-library/react';
import React from 'react';

import { Navigation } from '../Navigation';

describe('Comprueba que están todos los elementos', () => {
  it('Tiene que aparecer el Logo', () => {
    render(
      <Navigation
        textToFilter={''}
        setTextToFilter={function (text: string): void {
          throw new Error('Function not implemented.');
        }}
        formatedFilter={''}
      />
    );

    screen.getByText(/in/i);
    screen.getByText(/Film/i);
  });
});
