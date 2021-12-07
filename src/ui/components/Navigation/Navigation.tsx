import styled from 'styled-components';

import { sizes, color, media, font } from '../../theme';
import { SearchBar } from '../SearchBar';

import { SearchBarInfoProps } from '../SearchBar';

export const Navigation: React.FC<SearchBarInfoProps> = ({
  textToFilter,
  formatedFilter,
  setTextToFilter,
}) => {
  return (
    <MainNavigation>
      <Name>
        in<Highlight>Film</Highlight>
      </Name>
      <SearchBar
        textToFilter={textToFilter}
        formatedFilter={formatedFilter}
        setTextToFilter={setTextToFilter}
      />
    </MainNavigation>
  );
};

const MainNavigation = styled.nav`
  padding-bottom: ${sizes.large};

  ${media.tablet`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    width: 100%;

  `}
`;

const Name = styled.p`
  color: white;
  font-family: 'Londrina Solid';
  font-size: ${font.sizes.h1};
  font-weight: ${font.weight.black};

  margin-bottom: ${sizes.small};

  ${media.tablet`
    margin: 0;
  `}
`;

const Highlight = styled.span`
  color: ${color.golden};
  font-weight: ${font.weight.black}; ;
`;
