import React from 'react';

import { fetchedInfo, infoFromFilm } from '../../App';

export const HomeContainer = (props: fetchedInfo) => {
  if (props.error) {
    return <p>No se han podido mostrar las 50 películas más vistas</p>;
  }

  if (props.loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      {props.filmsInfo &&
        props.filmsInfo.length > 0 &&
        props.filmsInfo.map((item: infoFromFilm, index: number) => {
          return (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
              alt={item.title}
            />
          );
        })}
    </>
  );
};