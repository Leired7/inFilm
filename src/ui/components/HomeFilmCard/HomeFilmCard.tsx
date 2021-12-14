import { InfoFromFilm } from 'src/core/domain/model';

import styled from 'styled-components';
import { font, color, media, grid } from '../../theme';

import { Link } from 'react-router-dom';

export const HomeFilmCard: React.FC<InfoFromFilm> = ({
  poster_path,
  title,
  release_date,
  genres_id,
  vote_average,
  vote_count,
  id,
  overview,
  backdrop_path,
}) => {
  const filmCardInfo = {
    id: id,
    vote_average: vote_average,
    vote_count: vote_count,
    release_date: release_date,
    title: title,
    poster_path: poster_path,
    overview: overview,
    backdrop_path: backdrop_path,
  };

  return (
    <>
      <Link
        to={`film/${id}`}
        state={{ filmCardInfo }}
        data-test-id={id}
        title={title}
      >
        <FilmCard
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})`,
          }}
        >
          <FilmPoster
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width="100"
            height="232"
          />
          <FilmCardInfo>
            <ReleaseData>{release_date}</ReleaseData>
            <FilmTitle title={title}>
              <strong>{title}</strong>
            </FilmTitle>
            <FilmBrief>
              <p>
                <VoteText>Puntuación: </VoteText>
                <VoteAverage>{vote_average} / 10 </VoteAverage>
              </p>
              <p>
                <VoteText>Votos: </VoteText>
                <VoteCount>{vote_count}</VoteCount>
              </p>
            </FilmBrief>
          </FilmCardInfo>
        </FilmCard>
      </Link>
    </>
  );
};

const FilmCard = styled.div`
  position: relative;

  height: auto;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;

  overflow: hidden;

  & p {
    margin: 0;
    position: relative;
    z-index: 1;
  }
`;

const FilmPoster = styled.img`
  background-color: ${color.golden};
  color: ${color.darkBlue};
  font-weight: ${font.weight.bold};
  padding: ${grid.gap.tablet} ${media.tablet`
    max-height: 232px;
  `};
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

const FilmBrief = styled.div`
  max-height: 200px;
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
