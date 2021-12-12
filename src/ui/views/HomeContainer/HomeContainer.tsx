import styled from 'styled-components';

import { grid, color } from '../../theme';
import { ImageList } from '../../components/ImageList';
import { Navigation } from '../../components/Navigation/Navigation';
import { InfoFromFilm } from '../../../core/domain/model';

export interface HomeInfoProps {
  userTypeSearch: string;
  setUserTypeSearch: (text: string) => void;
  formatedFilter: string;
  error: boolean;
  loading: boolean;
  filteredFilms: InfoFromFilm[];
}

export const HomeContainer: React.FC<HomeInfoProps> = ({
  userTypeSearch,
  setUserTypeSearch,
  formatedFilter,
  error,
  loading,
  filteredFilms,
}) => {
  return (
    <Container className="container">
      <Navigation
        userTypeSearch={userTypeSearch}
        setUserTypeSearch={setUserTypeSearch}
        formatedFilter={formatedFilter}
      />
      <main>
        <ImageList
          error={error}
          loading={loading}
          filteredFilms={filteredFilms}
          formatedFilter={formatedFilter}
        />
      </main>
    </Container>
  );
};

const Container = styled.div`
  padding: ${grid.gap.tablet}px;
  min-height: 100vh;

  border: 10px solid ${color.golden};
`;
