import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import { GlobalStyles } from './ui/theme/GlobalStyles';

import { InfoFromFilm } from './core/domain/model';
import { ApiRepository } from './core/infraestructure/ApiRepository';
import { fetchAllFilms } from './core/services/fetchAllFilms';

import { HomeContainer } from './ui/views/HomeContainer';
import { FilmCardInformation } from './ui/components/FilmCardInformation';
import { getFilmsFilterwithGenres } from './core/services/getFilmsFilterWithGenres';

function App() {
  const [fetchedInfo, setFetchedInfo] = useState<Array<InfoFromFilm>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [userTypeSearch, setUserTypeSearch] = useState<string>('');

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

  const { formatedFilter, filmsWithGenres } = getFilmsFilterwithGenres(
    userTypeSearch,
    fetchedInfo
  );

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route
          path="/"
          element={
            <HomeContainer
              userTypeSearch={userTypeSearch}
              setUserTypeSearch={setUserTypeSearch}
              formatedFilter={formatedFilter}
              error={error}
              loading={loading}
              filteredFilms={filmsWithGenres}
            />
          }
        />
        <Route path="film">
          <Route path=":filmId" element={<FilmCardInformation />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
