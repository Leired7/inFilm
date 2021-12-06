import { rem } from 'polished';

const SMALL_GRID_SIZE = 4;
const BASE_GRID_SIZE = 8;

const size = {
  tiny: 4,
  extrasmall: 8,
  small: 12,
  base: 16,
  medium: 24,
  large: 32,
  huge: 48,
  extrahuge: 64,
  giant: 96,
};

export const sizes = {
  /** 4 */
  tiny: rem(size.tiny),
  /** 8 */
  extrasmall: rem(size.extrasmall),
  /** 12 */
  small: rem(size.small),
  /** 16 */
  base: rem(size.base),
  /** 24 */
  medium: rem(size.medium),
  /** 32 */
  large: rem(size.large),
  /** 48 */
  huge: rem(size.huge),
  /** 64 */
  extrahuge: rem(size.extrahuge),
  /** 96 */
  giant: rem(size.giant),
  /** Genera tamaños en escala del grid pequeño */
  smallScale: (factor) => rem(factor * SMALL_GRID_SIZE),
  /** Genera tamaños en escala del grid base */
  baseScale: (factor) => rem(factor * BASE_GRID_SIZE),
};
