import { Link, useLocation } from 'react-router-dom';
import { InfoFromFilm } from 'src/core/domain/model';
import { color, font, grid, media, sizes } from 'src/ui/theme';
import styled from 'styled-components';

export const FilmCardInformation = () => {
  const location = useLocation();
  const cardInfo: InfoFromFilm = location.state.filmCardInfo;
  const backHomeLink = 'Volver a la página principal';

  return (
    <>
      <BackgroundImage
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${cardInfo.backdrop_path})`,
        }}
      ></BackgroundImage>

      <TextWrapper>
        <GenreList title={`Géneros`} className="scroller-x">
          {cardInfo.genres?.map((genre, index) => {
            return <GenreListItem key={index}>{genre.name}</GenreListItem>;
          })}
        </GenreList>
        <Title>
          {cardInfo.title} <Highlight>{cardInfo.release_date}</Highlight>
        </Title>
        <Overview>{cardInfo.overview}</Overview>
        <StyledLink to="/" title={backHomeLink}>
          {backHomeLink}
        </StyledLink>
      </TextWrapper>
    </>
  );
};

const BackgroundImage = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
`;

const Title = styled.h1`
  color: white;
  font-family: 'Londrina Solid';
  font-size: ${font.sizes.h1};
  font-weight: ${font.weight.black};

  margin-bottom: ${sizes.small};

  ${media.tablet`
    margin: 0;
  `}
`;

const Highlight = styled.span`
  color: ${color.golden};
  font-weight: ${font.weight.bold};
  font-size: ${font.sizes.medium};
`;

const Overview = styled.p`
  color: ${color.white};
`;

const TextWrapper = styled.div`
  padding: ${grid.gap.tablet}px;

  ${media.tablet`
  padding: ${grid.gap.desktop}px;
  `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.02rem;
  font-family: 'Londrina Solid';
  font-size: ${font.sizes.medium};
  color: ${color.golden};
  margin: ${grid.gap.desktop}px 0 0 0;

  &:hover {
    color: ${color.white};
  }
`;

const GenreList = styled.ul`
  display: flex;
  gap: 10px;

  margin: 0 -45px 24px 0;
`;

const GenreListItem = styled.li`
  line-height: 1;
  font-weight: ${font.weight.bold};
  text-align: center;
  min-width: 120px;
  background-color: ${color.golden};
  color: ${color.darkBlue};
  padding: 8px 10px;

  border-radius: 15px;
  margin: 0 0 10px;
  white-space: nowrap;
`;
