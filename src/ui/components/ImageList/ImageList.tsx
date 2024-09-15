import React from 'react';
import styled from 'styled-components';
import { InfoFromFilm } from '../../../core/domain/model';
import { color, font, grid, media, sizes } from '../../theme';
import { HomeFilmCard } from '../HomeFilmCard';

export interface FilmInfoProps {
  error?: boolean;
  loading: boolean;
  filteredFilms: InfoFromFilm[];
  formatedFilter: string;
  typeOfList: string;
  nowPlayingError?: boolean;
}

export const ImageList: React.FC<FilmInfoProps> = ({
  error,
  loading,
  filteredFilms,
  formatedFilter,
  typeOfList,
  nowPlayingError,
}) => {
  if (error || nowPlayingError) {
    return <p>{`No se han podido mostrar las 20 películas ${typeOfList}`}</p>;
  }

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (filteredFilms.length === 0 && formatedFilter.length > 3) {
    return <p>{`Ohhhh no encontramos lo que buscabas 😔`}</p>;
  }

  return (
    <>
      <DisplayList title={`Películas ${typeOfList}`}>
        <TitleLi>
          <ListTitle>Películas {typeOfList}</ListTitle>
        </TitleLi>
        {filteredFilms.map((item: InfoFromFilm, index: number) => {
          const {
            poster_path,
            title,
            release_date,
            genre_ids,
            vote_average,
            vote_count,
            id,
            overview,
            backdrop_path,
            genres,
          } = item;

          return (
            <li key={index} title={title}>
              <HomeFilmCard
                poster_path={poster_path}
                title={title}
                release_date={release_date}
                genre_ids={genre_ids}
                vote_average={vote_average}
                vote_count={vote_count}
                id={id}
                overview={overview}
                backdrop_path={backdrop_path}
                genres={genres}
              />
            </li>
          );
        })}
      </DisplayList>
    </>
  );
};

const DisplayList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: ${sizes.small};
  margin-bottom: ${sizes.small};

  ${media.desktop`
    padding: 0 ${grid.gap.desktopLarge}px;
  `}
`;

const ListTitle = styled.h2`
  color: ${color.golden};
  font-family: 'Londrina Solid';
  font-size: ${font.sizes.large}
  text-transform: uppercase;
  padding: 16px;
`;

const TitleLi = styled.div`
  background-color: rgba(76, 86, 106, 0.9);
`;
