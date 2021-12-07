import React from 'react';

import styled from 'styled-components';

import { InfoFromFilm } from '../../../core/domain/model';

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
        return (
          <FilmCard key={index}>
            <figure>
              <Poster
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt={item.title}
              />
              <figcaption>{item.title}</figcaption>
            </figure>
            <p>{item.release_date}</p>
          </FilmCard>
        );
      })}
    </>
  );
};

const FilmCard = styled.div``;

const Poster = styled.img``;
