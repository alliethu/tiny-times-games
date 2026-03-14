import { Colors } from './colors';
import { Typography, FontSizes, FontWeights } from './typography';

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// Minimum touch target for kid-friendly interaction
export const MIN_TOUCH_TARGET = 48;

export { Colors, Typography, FontSizes, FontWeights };
