import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { InfoFromFilm } from './core/domain/model';
import { ApiRepository } from './core/infraestructure/ApiRepository';
import { fetchAllPopularFilms } from './core/services/fetchAllPopularFilms';
import { getFilmsFilterwithGenres } from './core/services/getFilmsFilterWithGenres';
import { FilmCardInformation } from './ui/components/FilmCardInformation';
import { GlobalStyles } from './ui/theme/GlobalStyles';
import { HomeContainer } from './ui/views/HomeContainer';

function App() {
  const [fetchedPopularFilmsInfo, setFetchedPopularFilmsInfo] = useState<
    Array<InfoFromFilm>
  >([]);
  const [fetchedNowPlayingFilmsInfo, setFetchedNowPlayingFilmsInfo] = useState<
    Array<InfoFromFilm>
  >([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [nowPlayingError, setNowPlayingError] = useState<boolean>(false);

  const [userTypeSearch, setUserTypeSearch] = useState<string>('');

  useEffect(() => {
    /* Solution to memory leaks: https://www.wisdomgeek.com/development/web-development/react/avoiding-race-conditions-memory-leaks-react-useeffect/amp/?utm_source=pocket_mylist */
    let isComponentMounted = true;
    try {
      const fetchPopularFilms = async () => {
        const filmApiRepository = new ApiRepository();
        if (isComponentMounted) {
          const response = await fetchAllPopularFilms(filmApiRepository);

          if (response.status === 200) {
            await setFetchedPopularFilmsInfo(response.results);
          } else {
            setError(true);
          }
        }
      };

      const fetchedNowPlayingFilmsInfo = async () => {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing'
        );

        console.log(response.status);
        if (response.status === 200) {
          const data = await response.json();
          await setFetchedNowPlayingFilmsInfo(data.results);
        } else {
          setNowPlayingError(true);
        }
      };

      fetchPopularFilms();
      fetchedNowPlayingFilmsInfo();
    } finally {
      setLoading(false);
    }

    return () => {
      isComponentMounted = false;
    };
  }, []);

  const userText: string = userTypeSearch
    .split(' ')
    .filter((substring: string) => substring)
    .join(' ')
    .toLowerCase();

  const filmsWithGenres = getFilmsFilterwithGenres(
    userText,
    fetchedPopularFilmsInfo
  );

  const nowPlayingFilms = getFilmsFilterwithGenres(
    userText,
    fetchedNowPlayingFilmsInfo
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
              formatedFilter={userText}
              error={error}
              loading={loading}
              filteredFilms={filmsWithGenres}
              nowPlayingFilmsWithGenres={nowPlayingFilms}
              nowPlayingError={nowPlayingError}
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
