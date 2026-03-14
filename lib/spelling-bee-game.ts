import { SPELLING_BEE_PUZZLES, SpellingBeePuzzle } from '@/data/spelling-bee';
import { getDailyPuzzleIndex } from './daily-puzzle';

export type BeeRank = 'Beginner' | 'Good' | 'Great' | 'Amazing' | 'Genius';

export interface BeeGameState {
  puzzle: SpellingBeePuzzle;
  foundWords: string[];
  currentInput: string;
  score: number;
  maxScore: number;
  rank: BeeRank;
  gameOver: boolean;
  message: string | null;
}

function calculateMaxScore(puzzle: SpellingBeePuzzle): number {
  return puzzle.words.reduce((sum, word) => {
    let points = word.length === 3 ? 1 : word.length;
    if (puzzle.pangrams.includes(word)) points += 7;
    return sum + points;
  }, 0);
}

function getRank(score: number, maxScore: number): BeeRank {
  const pct = score / maxScore;
  if (pct >= 0.65) return 'Genius';
  if (pct >= 0.45) return 'Amazing';
  if (pct >= 0.25) return 'Great';
  if (pct >= 0.1) return 'Good';
  return 'Beginner';
}

export const RANK_THRESHOLDS: { rank: BeeRank; pct: number }[] = [
  { rank: 'Beginner', pct: 0 },
  { rank: 'Good', pct: 0.1 },
  { rank: 'Great', pct: 0.25 },
  { rank: 'Amazing', pct: 0.45 },
  { rank: 'Genius', pct: 0.65 },
];

export function createBeeGame(): BeeGameState {
  const index = getDailyPuzzleIndex(SPELLING_BEE_PUZZLES.length);
  const puzzle = SPELLING_BEE_PUZZLES[index];
  const maxScore = calculateMaxScore(puzzle);

  return {
    puzzle,
    foundWords: [],
    currentInput: '',
    score: 0,
    maxScore,
    rank: 'Beginner',
    gameOver: false,
    message: null,
  };
}

export function addBeeLetter(state: BeeGameState, letter: string): BeeGameState {
  if (state.gameOver) return state;
  return { ...state, currentInput: state.currentInput + letter.toUpperCase(), message: null };
}

export function removeBeeLastLetter(state: BeeGameState): BeeGameState {
  if (state.currentInput.length === 0) return state;
  return { ...state, currentInput: state.currentInput.slice(0, -1), message: null };
}

export function clearBeeInput(state: BeeGameState): BeeGameState {
  return { ...state, currentInput: '', message: null };
}

export function shuffleBeeLetters(state: BeeGameState): BeeGameState {
  const shuffled = [...state.puzzle.outerLetters];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return {
    ...state,
    puzzle: { ...state.puzzle, outerLetters: shuffled },
    message: null,
  };
}

export function submitBeeWord(state: BeeGameState): BeeGameState {
  const word = state.currentInput;

  if (word.length < 3) {
    return { ...state, currentInput: '', message: 'Too short!' };
  }

  if (!word.includes(state.puzzle.centerLetter)) {
    return { ...state, currentInput: '', message: 'Must use center letter!' };
  }

  const validLetters = new Set([state.puzzle.centerLetter, ...state.puzzle.outerLetters]);
  for (const ch of word) {
    if (!validLetters.has(ch)) {
      return { ...state, currentInput: '', message: 'Bad letter!' };
    }
  }

  if (state.foundWords.includes(word)) {
    return { ...state, currentInput: '', message: 'Already found!' };
  }

  if (!state.puzzle.words.includes(word)) {
    return { ...state, currentInput: '', message: 'Not a word!' };
  }

  // Valid word!
  const isPangram = state.puzzle.pangrams.includes(word);
  let points = word.length === 3 ? 1 : word.length;
  if (isPangram) points += 7;

  const newScore = state.score + points;
  const newRank = getRank(newScore, state.maxScore);
  const newFoundWords = [...state.foundWords, word].sort();

  const message = isPangram
    ? '🎉 PANGRAM!'
    : points >= 5
      ? '✨ Great word!'
      : '👍 Nice!';

  const gameOver = newFoundWords.length === state.puzzle.words.length;

  return {
    ...state,
    foundWords: newFoundWords,
    currentInput: '',
    score: newScore,
    rank: newRank,
    gameOver,
    message,
  };
}
