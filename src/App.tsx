import React, { SyntheticEvent, useEffect, useState } from 'react';
import './App.css';
import { HomeContainer } from './components/HomeContainer/Home';

export interface infoFromFilm {
  backdrop_path: string;
  title: string;
}

export interface fetchedInfo {
  error: boolean;
  loading: boolean;
  filmsInfo: infoFromFilm[];
}

function App() {
  const [filmsInfo, setFilmInfo] = useState<Array<infoFromFilm>>([]);
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
        setFilmInfo(data.results);
      };
      popularFilms();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredFilms = filmsInfo.map((item: infoFromFilm, index: number) => {
    return filter.length < 3;
  });

  return (
    <main>
      <label htmlFor="busqueda">
        ¿Qué quieres buscar hoy?
        <input
          id="busqueda"
          placeholder="¿Qué quieres buscar hoy?"
          value={filter}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilter(event.currentTarget.value);
          }}
        />
      </label>
      {filteredFilms && (
        <p>Hacen falta 3 carácteres para iniciar la búsqueda... ;-)</p>
      )}
      <HomeContainer error={error} loading={loading} filmsInfo={filmsInfo} />
    </main>
  );
}

export default App;
