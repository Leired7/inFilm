import styled from 'styled-components';

import { sizes, color, media } from '../../theme';

export interface SearchBarInfoProps {
  textToFilter: string;
  setTextToFilter: (text: string) => void;
  formatedFilter: string;
}

export const SearchBar: React.FC<SearchBarInfoProps> = ({
  textToFilter,
  formatedFilter,
  setTextToFilter,
}) => {
  return (
    <SearchBarForm>
      <SearchLabel htmlFor="busqueda">Busca para 😴</SearchLabel>
      <SearchInput
        id="busqueda"
        placeholder="Busca para 😴"
        value={textToFilter}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTextToFilter(event.currentTarget.value);
        }}
      />
      {formatedFilter.length !== 0 && formatedFilter.length <= 3 && (
        <p>
          Hacen falta 3 carácteres diferentes al espacio para iniciar la
          búsqueda... 😉
        </p>
      )}
    </SearchBarForm>
  );
};

const SearchBarForm = styled.form`
  ${media.tablet`
    flex-basis: 80%;
  `}
`;
const SearchLabel = styled.label`
  display: none;
`;
const SearchInput = styled.input`
  border: none;

  width: 100%;
  padding: ${sizes.small};
  height: ${sizes.large};

  border-radius: ${sizes.tiny};

  background: ${color.lightGrey};
  color: ${color.white};

  &:focus {
    outline: ${sizes.tiny} dashed ${color.golden};
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.1);
  }
`;
