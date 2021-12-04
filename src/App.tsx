import React, { useEffect, useState } from 'react';
import './App.css';
import { HomeContainer } from './components/HomeContainer/Home';
import { SearchBar } from './components/SearchBar/SearchBar';

export interface infoFromFilm {
  backdrop_path: string;
  title: string;
}

export interface fetchedInfo {
  error: boolean;
  loading: boolean;
  fetchedInfo: infoFromFilm[];
}

function App() {
  const [fetchedInfo, setfetchedInfo] = useState<Array<infoFromFilm>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    try {
      const popularFilms = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular`
        );

        const data = await response.json();
        setfetchedInfo(data.results);
      };
      popularFilms();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeSpaces = (string: string): string => {
    return string.split('  ').join('');
  };

  const filteredFilms = fetchedInfo.filter(
    (item: infoFromFilm, index: number) => {
      const minimumCaractersToSearch = 3;

      if (filter.length >= minimumCaractersToSearch) {
        const withoutBlankSpaces = removeSpaces(filter);

        return item.title.includes(withoutBlankSpaces);
      }
      return item;
    }
  );

  return (
    <main>
      <SearchBar filter={filter} setFilter={setFilter} />
      <HomeContainer
        error={error}
        loading={loading}
        fetchedInfo={filteredFilms}
      />
    </main>
  );
}

export default App;
