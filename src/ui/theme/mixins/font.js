import { rem } from 'polished';
import { css } from 'styled-components';

import { media } from './media';

const fontFamily = {
  lato: 'Lato',
};

const fontWeight = {
  regular: 400,
  bold: 700,
  black: 900,
};

export const typi = {
  tiny: {
    default: {
      size: 10,
      lineHeight: 16,
      family: fontFamily.lato,
    },
  },
  small: {
    default: {
      size: 12,
      lineHeight: 20,
      family: fontFamily.lato,
    },
  },
  base: {
    default: {
      size: 14,
      lineHeight: 24,
      family: fontFamily.lato,
    },
  },
  large: {
    default: {
      size: 20,
      lineHeight: 32,
      family: fontFamily.lato,
    },
  },
  buttonSmall: {
    default: {
      size: 12,
      lineHeight: 16,
      family: fontFamily.lato,
    },
  },
  button: {
    default: {
      size: 14,
      lineHeight: 16,
      family: fontFamily.lato,
    },
  },
  medium: {
    default: {
      size: 16,
      lineHeight: 24,
      family: fontFamily.lato,
    },
  },
  nav: {
    default: {
      size: 16,
      lineHeight: 24,
      family: fontFamily.lato,
    },
  },
  h1: {
    default: {
      size: 26,
      lineHeight: 32,
      family: fontFamily.lato,
    },
  },
};

export const font = {
  sizes: {
    tiny: generateResponsiveFontSize(typi.tiny),
    small: generateResponsiveFontSize(typi.small),
    base: generateResponsiveFontSize(typi.base),
    large: generateResponsiveFontSize(typi.large),
    buttonSmall: generateResponsiveFontSize(typi.buttonSmall),
    button: generateResponsiveFontSize(typi.button),
    medium: generateResponsiveFontSize(typi.medium),
    nav: generateResponsiveFontSize(typi.nav),
    h1: generateResponsiveFontSize(typi.h1),
  },
  weight: fontWeight,
  family: fontFamily,
};

function generateResponsiveFontSize(size) {
  return () => css`
    ${generateFontSize(size.default)};

    ${size.tablet &&
    media.tablet`
      ${generateFontSize(size.tablet)}
    `};

    ${size.desktop &&
    media.desktop`
      ${generateFontSize(size.desktop)}
    `};
  `;
}

function generateFontSize(value) {
  return css`
    font-family: ${value.family}, Sans-Serif;
    font-size: ${rem(value.size)};
    line-height: ${value.lineHeight / value.size};
    font-weight: ${value.weight};
    word-spacing: ${value.wordSpacing};
  `;
}
