import styled from 'styled-components';

import { sizes, color, media } from '../../theme';
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
  padding-bottom: ${sizes.huge};

  ${media.tablet`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
  `}
`;

/* *************** */

const Name = styled.p`
  color: white;
  font-weight: 700;

  margin-bottom: ${sizes.small};

  ${media.tablet`
    margin: 0;
  `}
`;

const Highlight = styled.span`
  color: ${color.golden};
  font-weight: 700;
`;
