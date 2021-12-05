import React from 'react';

import { InfoFromFilm, FetchedInfo } from '../../../core/domain/model';
export const ImageList = (props: FetchedInfo) => {
  if (props.error) {
    return <p>No se han podido mostrar las 50 películas más vistas</p>;
  }

  if (props.loading) {
    return <h1>Cargando...</h1>;
  }

  if (props.filteredFilms.length === 0 && props.formatedFilter.length > 3) {
    return <p>Ohhhh no encontramos lo que buscabas 😔</p>;
  }

  return (
    <>
      {props.filteredFilms.map((item: InfoFromFilm, index: number) => {
        return (
          <div key={index}>
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt={item.title}
              />
              <figcaption>{item.title}</figcaption>
            </figure>
            <p>{item.release_date}</p>
          </div>
        );
      })}
    </>
  );
};
