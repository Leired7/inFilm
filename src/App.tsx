import React, { useEffect, useState } from 'react';
import './App.css';
import { ImageList } from './ui/components/ImageList/ImageList';
import { SearchBar } from './ui/components/SearchBar/SearchBar';

import { InfoFromFilm } from './core/domain/model';

import { ApiRepository } from './core/infraestructure/ApiRepository';
import { fetchAllFilms } from './core/services/fetchAllFilms';

function App() {
  const [fetchedInfo, setfetchedInfo] = useState<Array<InfoFromFilm>>([]);
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
          setfetchedInfo(await fetchAllFilms(filmApiRepository));
        }
      };

      fetchPopularFilms();

      return () => {
        isComponentMounted = false;
      };
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
    <main>
      <SearchBar
        textToFilter={textToFilter}
        setTextToFilter={setTextToFilter}
        formatedFilter={formatedFilter}
      />
      <ImageList
        error={error}
        loading={loading}
        filteredFilms={filteredFilms}
        formatedFilter={formatedFilter}
      />
    </main>
  );
}

export default App;
