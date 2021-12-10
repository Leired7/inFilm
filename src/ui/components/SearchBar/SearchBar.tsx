import styled from 'styled-components';

import { sizes, color, media, font } from '../../theme';

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
      {formatedFilter.length !== 0 && formatedFilter.length <= 2 && (
        <HelpMessage>
          Hacen falta 3 carácteres diferentes al espacio para iniciar la
          búsqueda... 😉
        </HelpMessage>
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
  font-weight: ${font.weight.regular};
  letter-spacing: 1px;

  &:focus-visible {
    outline: 4px dashed ${color.golden};
  }
`;

const HelpMessage = styled.p`
  color: ${color.white};
  margin-top: ${sizes.small};

  min-height: ${sizes.tiny};
`;
