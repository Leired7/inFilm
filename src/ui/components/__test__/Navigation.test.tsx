import { render, screen } from '@testing-library/react';
import React from 'react';

import { Navigation } from '../Navigation';

describe('Comprueba que están todos los elementos', () => {
  it('Tiene que aparecer el Logo', () => {
    const mock = jest.fn();

    render(
      <Navigation
        textToFilter={''}
        setTextToFilter={mock}
        formatedFilter={''}
      />
    );

    screen.getByText(/in/i);
    screen.getByText(/Film/i);
  });
});
