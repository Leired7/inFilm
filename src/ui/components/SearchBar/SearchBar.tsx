import styled from 'styled-components';
import { color, font, media, sizes } from '../../theme';
import { VisuallyHidden } from '../VisuallyHidden';

export interface SearchBarInfoProps {
  userTypeSearch: string;
  setUserTypeSearch: (text: string) => void;
  formatedFilter: string;
}

export const SearchBar: React.FC<SearchBarInfoProps> = ({
  userTypeSearch,
  formatedFilter,
  setUserTypeSearch,
}) => {
  return (
    <SearchBarForm>
      <VisuallyHidden label={true} for="busqueda">
        Busca películas para echar la siesta 😴
      </VisuallyHidden>
      <SearchInput
        id="busqueda"
        placeholder="Busca películas para echar la siesta 😴"
        value={userTypeSearch}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUserTypeSearch(event.currentTarget.value);
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
