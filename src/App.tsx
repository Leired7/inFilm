import React, { useEffect } from 'react';
import './App.css';

export interface infoFromFilm {
  backdrop_path: string;
  title: string;
}
function App() {
  const [filmsInfo, setFilmInfo] = React.useState<Array<infoFromFilm>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {!loading &&
        filmsInfo.length > 0 &&
        filmsInfo.map((item: infoFromFilm, index: number) => {
          return (
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
              alt={item.title}
            />
          );
        })}
      <p>No se han podido mostrar las 50 películas más vistas</p>
    </>
  );
}

export default App;
