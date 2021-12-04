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
  filteredFilms: infoFromFilm[];
  formatedFilter: string;
}

function App() {
  const [fetchedInfo, setfetchedInfo] = useState<Array<infoFromFilm>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [textToFilter, setTextToFilter] = useState<string>('');

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

  const formatedFilter: string = textToFilter
    .split(' ')
    .filter((substring) => substring)
    .join(' ')
    .toLowerCase();

  const filteredFilms: infoFromFilm[] = fetchedInfo.filter(
    (item: infoFromFilm, index: number) => {
      const minimumCaractersToSearch = 3;

      if (formatedFilter.length >= minimumCaractersToSearch) {
        return item.title.toLowerCase().includes(formatedFilter);
      }
      return item;
    }
  );

  return (
    <main>
      <SearchBar
        textToFilter={textToFilter}
        setTextToFilter={setTextToFilter}
        formatedFilter={formatedFilter}
      />
      <HomeContainer
        error={error}
        loading={loading}
        filteredFilms={filteredFilms}
        formatedFilter={formatedFilter}
      />
    </main>
  );
}

export default App;
