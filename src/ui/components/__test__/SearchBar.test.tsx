import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../SearchBar';

describe('Funcionamiento del buscador', () => {
  it('Muestra mensaje si el término de búsqueda tiene 1 caracter', () => {
    const userTypedWord = 'l';

    const mock = jest.fn();

    render(
      <SearchBar
        userTypeSearch={''}
        setUserTypeSearch={mock}
        formatedFilter={''}
      />
    );

    const labelText = /Busca películas para echar la siesta 😴/i;
    screen.getByLabelText(labelText);

    const searchInput = screen.getByPlaceholderText(labelText);
    userEvent.type(searchInput, userTypedWord);

    render(
      <SearchBar
        userTypeSearch={userTypedWord}
        setUserTypeSearch={mock}
        formatedFilter={userTypedWord}
      />
    );

    screen.getByText(
      'Hacen falta 3 carácteres diferentes al espacio para iniciar la búsqueda... 😉'
    );
  });

  it('Muestra mensaje si el término de búsqueda tiene 2 caracter', () => {
    const userTypedWord = 'la';

    const mock = jest.fn();

    render(
      <SearchBar
        userTypeSearch={''}
        setUserTypeSearch={mock}
        formatedFilter={''}
      />
    );

    const labelText = /Busca películas para echar la siesta 😴/i;
    screen.getByLabelText(labelText);

    const searchInput = screen.getByPlaceholderText(labelText);
    userEvent.type(searchInput, userTypedWord);

    render(
      <SearchBar
        userTypeSearch={userTypedWord}
        setUserTypeSearch={mock}
        formatedFilter={userTypedWord}
      />
    );

    screen.getByText(
      'Hacen falta 3 carácteres diferentes al espacio para iniciar la búsqueda... 😉'
    );
  });

  it('No muestra el mensaje si el término de búsqueda tiene 3 caracteres o más', async () => {
    const userTypedWord = 'one';

    const mock = jest.fn();

    render(
      <SearchBar
        userTypeSearch={''}
        setUserTypeSearch={mock}
        formatedFilter={''}
      />
    );

    const labelText = /Busca películas para echar la siesta 😴/i;
    screen.getByLabelText(labelText);

    const searchInput = screen.getByPlaceholderText(labelText);
    userEvent.type(searchInput, userTypedWord);

    render(
      <SearchBar
        userTypeSearch={userTypedWord}
        setUserTypeSearch={mock}
        formatedFilter={userTypedWord}
      />
    );

    const helpMessage = screen.queryByText(
      'Hacen falta 3 carácteres diferentes al espacio para iniciar la búsqueda... 😉'
    );
    expect(helpMessage).not.toBeInTheDocument();
  });
});
