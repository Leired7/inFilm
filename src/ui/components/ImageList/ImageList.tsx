import React from 'react';

import { InfoFromFilm } from '../../../core/domain/model';

import { HomeFilmCard } from '../HomeFilmCard';

export interface FilmInfoProps {
  error: boolean;
  loading: boolean;
  filteredFilms: InfoFromFilm[];
  formatedFilter: string;
}

export const ImageList: React.FC<FilmInfoProps> = ({
  error,
  loading,
  filteredFilms,
  formatedFilter,
}) => {
  if (error) {
    return <p>No se han podido mostrar las 20 películas más vistas</p>;
  }

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (filteredFilms.length === 0 && formatedFilter.length > 3) {
    return <p>Ohhhh no encontramos lo que buscabas 😔</p>;
  }

  return (
    <>
      {filteredFilms.map((item: InfoFromFilm, index: number) => {
        const {
          poster_path,
          title,
          release_date,
          genres_id,
          vote_average,
          vote_count,
        } = item;
        return (
          <HomeFilmCard
            poster_path={poster_path}
            title={title}
            release_date={release_date}
            genres_id={genres_id}
            vote_average={vote_average}
            vote_count={vote_count}
            key={index}
          />
        );
      })}
    </>
  );
};
