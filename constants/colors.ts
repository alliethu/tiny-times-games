export const Colors = {
  // Primary palette — bright and cheerful
  primary: '#6C63FF', // purple - main brand color
  primaryLight: '#A5A0FF',
  primaryDark: '#4B44CC',

  // Game accent colors
  wordle: '#58CC02', // green
  wordleLight: '#89E219',
  spellingBee: '#FFB020', // amber/honey
  spellingBeeLight: '#FFD166',
  crossword: '#1CB0F6', // blue
  crosswordLight: '#7DD3FC',
  trivia: '#FF6B6B', // coral
  triviaLight: '#FFA8A8',

  // Wordle tile states
  correct: '#58CC02', // green
  present: '#FFB020', // amber
  absent: '#CBD5E1', // gray
  tileDefault: '#E2E8F0',

  // UI
  background: '#FAFBFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F5F9',
  card: '#FFFFFF',

  // Text
  text: '#1E293B',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  textOnPrimary: '#FFFFFF',
  textOnDark: '#FFFFFF',

  // Feedback
  success: '#58CC02',
  error: '#FF4B4B',
  warning: '#FFB020',
  info: '#1CB0F6',

  // Borders & shadows
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  shadow: 'rgba(0, 0, 0, 0.08)',

  // Streaks & rewards
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  star: '#FFD700',
} as const satisfies Record<string, string>;

export type ColorName = keyof typeof Colors;
