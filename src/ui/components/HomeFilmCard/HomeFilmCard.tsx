import { InfoFromFilm } from 'src/core/domain/model';

export const HomeFilmCard: React.FC<InfoFromFilm> = ({
  poster_path,
  title,
  release_date,
  genres_id,
  vote_average,
  vote_count,
}) => {
  return (
    <div>
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
        <figcaption>{title}</figcaption>
      </figure>
      <p>{release_date}</p>
    </div>
  );
};
