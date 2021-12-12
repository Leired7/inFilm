import { useParams } from 'react-router-dom';

export const FilmCardInformation = () => {
  const filmId = useParams();
  return (
    <>
      <h1>
        Soy el componente FilmCardInformation de la información de la películas:{' '}
        {filmId.filmId}
      </h1>
    </>
  );
};
