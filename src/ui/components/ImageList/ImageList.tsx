import React from 'react';
import styled from 'styled-components';

import { media, sizes, grid } from '../../theme';

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
    <DisplayList>
      {filteredFilms.map((item: InfoFromFilm, index: number) => {
        const {
          poster_path,
          title,
          release_date,
          genres_id,
          vote_average,
          vote_count,
          id,
        } = item;
        return (
          <HomeFilmCard
            poster_path={poster_path}
            title={title}
            release_date={release_date}
            genres_id={genres_id}
            vote_average={vote_average}
            vote_count={vote_count}
            id={id}
            key={index}
          />
        );
      })}
    </DisplayList>
  );
};

const DisplayList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: ${sizes.small};

  ${media.desktop`
    padding: 0 ${grid.gap.desktopLarge}px;
  `}
`;
