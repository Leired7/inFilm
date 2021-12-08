import { render, screen } from '@testing-library/react';

import { SearchBar } from '../SearchBar';
import userEvent from '@testing-library/user-event';

describe('Funcionamiento del buscador', () => {
  it('Muestra mensaje si el término de búsqueda es inferior a 3 caracteres.', () => {
    const userTypedWord = 'l';

    const mock = jest.fn();

    render(
      <SearchBar textToFilter={''} setTextToFilter={mock} formatedFilter={''} />
    );

    const labelText = /Busca para 😴/i;
    screen.getByLabelText(labelText);

    const searchInput = screen.getByPlaceholderText(labelText);
    userEvent.type(searchInput, userTypedWord);

    render(
      <SearchBar
        textToFilter={userTypedWord}
        setTextToFilter={mock}
        formatedFilter={userTypedWord}
      />
    );

    screen.getByText(
      'Hacen falta 3 carácteres diferentes al espacio para iniciar la búsqueda... 😉'
    );
  });
});
