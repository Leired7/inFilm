import { css } from 'styled-components';
import { breakpoints } from '../index';

export const media = {
  tablet: (strings, ...args) => css`
    @media (min-width: ${breakpoints.tablet}px) {
      ${css(strings, ...args)};
    }
  `,
  desktop: (strings, ...args) => css`
    @media (min-width: ${breakpoints.desktop}px) {
      ${css(strings, ...args)};
    }
  `,
  largeDesktop: (strings, ...args) => css`
    @media (min-width: ${breakpoints.largeDesktop}px) {
      ${css(strings, ...args)};
    }
  `,
};
