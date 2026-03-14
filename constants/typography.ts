import { TextStyle } from 'react-native';

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 30,
  '3xl': 36,
  '4xl': 48,
} as const;

export const FontWeights = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extrabold: '800' as TextStyle['fontWeight'],
};

export const Typography = {
  hero: {
    fontSize: FontSizes['4xl'],
    fontWeight: FontWeights.extrabold,
    lineHeight: 56,
  } satisfies TextStyle,

  h1: {
    fontSize: FontSizes['3xl'],
    fontWeight: FontWeights.bold,
    lineHeight: 44,
  } satisfies TextStyle,

  h2: {
    fontSize: FontSizes['2xl'],
    fontWeight: FontWeights.bold,
    lineHeight: 38,
  } satisfies TextStyle,

  h3: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
    lineHeight: 32,
  } satisfies TextStyle,

  body: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.regular,
    lineHeight: 28,
  } satisfies TextStyle,

  bodySmall: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.regular,
    lineHeight: 24,
  } satisfies TextStyle,

  label: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    lineHeight: 20,
  } satisfies TextStyle,

  caption: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.regular,
    lineHeight: 16,
  } satisfies TextStyle,

  // Game-specific
  tile: {
    fontSize: FontSizes['2xl'],
    fontWeight: FontWeights.bold,
    lineHeight: 36,
  } satisfies TextStyle,

  keyboard: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    lineHeight: 20,
  } satisfies TextStyle,

  clue: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.regular,
    lineHeight: 28,
  } satisfies TextStyle,
} as const;
