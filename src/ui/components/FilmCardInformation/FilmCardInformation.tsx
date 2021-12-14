import { url } from 'inspector';
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
  padding: ${grid.gap.desktop}px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.02rem;
  font-family: 'Londrina Solid';
  font-size: ${font.sizes.base};
  color: ${color.golden};
  margin: ${grid.gap.desktop}px 0 0 0;
`;
