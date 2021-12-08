import { InfoFromFilm } from 'src/core/domain/model';

import styled from 'styled-components';
import { font, color } from '../../theme';

export const HomeFilmCard: React.FC<InfoFromFilm> = ({
  poster_path,
  title,
  release_date,
  genres_id,
  vote_average,
  vote_count,
}) => {
  return (
    <FilmCard
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})`,
      }}
    >
      <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
      <FilmCardInfo>
        <ReleaseData>{release_date}</ReleaseData>
        <FilmTitle title={title}>
          <strong>{title}</strong>
        </FilmTitle>
        <p>
          <VoteText>Puntuación: </VoteText>
          <VoteAverage>{vote_average} / 10 </VoteAverage>
          <VoteText>Votos: </VoteText>
          <VoteCount>{vote_count}</VoteCount>
        </p>
      </FilmCardInfo>
    </FilmCard>
  );
};

const FilmCard = styled.div`
  position: relative;

  height: 250px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;

  overflow: hidden;

  cursor: default;

  & p {
    margin: 0;
    position: relative;
    z-index: 1;
  }
`;

const FilmCardInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 10px;
  background: inherit;

  background-size: cover;
  background-position: bottom;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    -webkit-filter: blur(6px);
    filter: blur(6px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
  }
`;

const ReleaseData = styled.p`
  ${font.sizes.tiny};
  color: ${color.golden};
`;

const FilmTitle = styled.p`
  font-family: 'Londrina Solid';
  font-weight: ${font.weight.bold};
  letter-spacing: 0.02rem;

  text-transform: uppercase;
  color: ${color.white};

  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
`;

const VoteAverage = styled.span`
  ${font.sizes.tiny};
  color: ${color.white};
`;

const VoteCount = styled.span`
  ${font.sizes.tiny};
  color: ${color.white};
`;

const VoteText = styled.strong`
  ${font.sizes.tiny};
  font-weight: ${font.weight.bold};
  color: white;
`;
