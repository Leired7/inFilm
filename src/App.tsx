import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { GlobalStyles } from './ui/theme/GlobalStyles';
import { grid, color } from './ui/theme';
import { ImageList } from './ui/components/ImageList/ImageList';
import { Navigation } from './ui/components/Navigation/Navigation';

import { InfoFromFilm } from './core/domain/model';
import { ApiRepository } from './core/infraestructure/ApiRepository';
import { fetchAllFilms } from './core/services/fetchAllFilms';

function App() {
  const [fetchedInfo, setFetchedInfo] = useState<Array<InfoFromFilm>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [textToFilter, setTextToFilter] = useState<string>('');

  useEffect(() => {
    /* Solution to memory leaks: https://www.wisdomgeek.com/development/web-development/react/avoiding-race-conditions-memory-leaks-react-useeffect/amp/?utm_source=pocket_mylist */
    let isComponentMounted = true;
    try {
      const fetchPopularFilms = async () => {
        const filmApiRepository = new ApiRepository();
        if (isComponentMounted) {
          const response = await fetchAllFilms(filmApiRepository);

          if (response.status === 200) {
            await setFetchedInfo(response.results);
          } else {
            setError(true);
          }
        }
      };

      fetchPopularFilms();
    } finally {
      setLoading(false);
    }

    return () => {
      isComponentMounted = false;
    };
  }, []);

  const formatedFilter: string = textToFilter
    .split(' ')
    .filter((substring) => substring)
    .join(' ')
    .toLowerCase();

  const filteredFilms: InfoFromFilm[] = fetchedInfo.filter(
    (item: InfoFromFilm, index: number) => {
      const minimumCaractersToSearch = 3;

      if (formatedFilter.length >= minimumCaractersToSearch) {
        return item.title.toLowerCase().includes(formatedFilter);
      }
      return item;
    }
  );

  return (
    <>
      <GlobalStyles />
      <Container className="container">
        <Navigation
          textToFilter={textToFilter}
          setTextToFilter={setTextToFilter}
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
    </>
  );
}

const Container = styled.div`
  padding: ${grid.gap.tablet}px;
  min-height: 100vh;

  border: 10px solid ${color.golden};
`;

export default App;
