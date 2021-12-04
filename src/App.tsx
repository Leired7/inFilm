import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

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

  return (
    <main>
      <label htmlFor="busqueda">
        ¿Qué quieres buscar hoy?
        <input id="busqueda" />
      </label>
      <HomeContainer error={error} loading={loading} filmsInfo={filmsInfo} />
    </main>
  );
}

export default App;
