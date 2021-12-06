import { css } from 'styled-components';
import { sizes } from '../index';

export const horizontalMarginsCss = css`
  margin-right: ${(p) => p.marginRight && sizes[p.marginRight]};

  margin-left: ${(p) => p.marginLeft && sizes[p.marginLeft]};
`;

export const verticalMarginsCss = css`
  margin-top: ${(p) => p.marginTop && sizes[p.marginTop]};

  margin-bottom: ${(p) => p.marginBottom && sizes[p.marginBottom]};
`;

export const marginsCss = css`
  ${horizontalMarginsCss}
  ${verticalMarginsCss}
`;
