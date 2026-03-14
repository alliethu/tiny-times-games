import { WORDLE_SOLUTIONS, VALID_GUESSES } from '@/data/wordle-words';
import { getDailyPuzzleIndex } from './daily-puzzle';

export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface TileState {
  letter: string;
  status: LetterStatus;
}

export interface WordleGameState {
  solution: string;
  guesses: TileState[][];
  currentRow: number;
  currentInput: string;
  gameOver: boolean;
  won: boolean;
  usedLetters: Record<string, LetterStatus>;
}

const WORD_LENGTH = 4;
const MAX_GUESSES = 6;

export function createWordleGame(): WordleGameState {
  const index = getDailyPuzzleIndex(WORDLE_SOLUTIONS.length);
  const solution = WORDLE_SOLUTIONS[index];

  return {
    solution,
    guesses: Array.from({ length: MAX_GUESSES }, () =>
      Array.from({ length: WORD_LENGTH }, () => ({ letter: '', status: 'empty' as LetterStatus })),
    ),
    currentRow: 0,
    currentInput: '',
    gameOver: false,
    won: false,
    usedLetters: {},
  };
}

export function addLetter(state: WordleGameState, letter: string): WordleGameState {
  if (state.gameOver || state.currentInput.length >= WORD_LENGTH) return state;

  const newInput = state.currentInput + letter.toUpperCase();
  const newGuesses = state.guesses.map((row) => [...row.map((t) => ({ ...t }))]);

  // Update the display
  for (let i = 0; i < WORD_LENGTH; i++) {
    newGuesses[state.currentRow][i] = {
      letter: i < newInput.length ? newInput[i] : '',
      status: 'empty',
    };
  }

  return { ...state, currentInput: newInput, guesses: newGuesses };
}

export function removeLetter(state: WordleGameState): WordleGameState {
  if (state.gameOver || state.currentInput.length === 0) return state;

  const newInput = state.currentInput.slice(0, -1);
  const newGuesses = state.guesses.map((row) => [...row.map((t) => ({ ...t }))]);

  for (let i = 0; i < WORD_LENGTH; i++) {
    newGuesses[state.currentRow][i] = {
      letter: i < newInput.length ? newInput[i] : '',
      status: 'empty',
    };
  }

  return { ...state, currentInput: newInput, guesses: newGuesses };
}

function evaluateGuess(guess: string, solution: string): TileState[] {
  const result: TileState[] = guess.split('').map((letter) => ({
    letter,
    status: 'absent' as LetterStatus,
  }));

  const solutionLetters = solution.split('');
  const used = new Array(WORD_LENGTH).fill(false);

  // First pass: mark correct letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === solution[i]) {
      result[i].status = 'correct';
      used[i] = true;
    }
  }

  // Second pass: mark present letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i].status === 'correct') continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!used[j] && guess[i] === solutionLetters[j]) {
        result[i].status = 'present';
        used[j] = true;
        break;
      }
    }
  }

  return result;
}

export function submitGuess(state: WordleGameState): WordleGameState | { error: string } {
  if (state.gameOver) return { error: 'Game is over' };
  if (state.currentInput.length !== WORD_LENGTH) return { error: 'Not enough letters' };
  if (!VALID_GUESSES.has(state.currentInput)) return { error: 'Not a valid word' };

  const evaluated = evaluateGuess(state.currentInput, state.solution);
  const newGuesses = state.guesses.map((row) => [...row.map((t) => ({ ...t }))]);
  newGuesses[state.currentRow] = evaluated;

  // Update keyboard letter tracking
  const newUsedLetters = { ...state.usedLetters };
  for (const tile of evaluated) {
    const current = newUsedLetters[tile.letter];
    // Only upgrade status: correct > present > absent
    if (
      !current ||
      tile.status === 'correct' ||
      (tile.status === 'present' && current !== 'correct')
    ) {
      newUsedLetters[tile.letter] = tile.status;
    }
  }

  const won = state.currentInput === state.solution;
  const gameOver = won || state.currentRow === MAX_GUESSES - 1;

  return {
    ...state,
    guesses: newGuesses,
    currentRow: state.currentRow + 1,
    currentInput: '',
    gameOver,
    won,
    usedLetters: newUsedLetters,
  };
}

/** Generate emoji grid for sharing */
export function getShareText(state: WordleGameState): string {
  const rows = state.guesses.slice(0, state.currentRow).map((row) =>
    row
      .map((tile) => {
        switch (tile.status) {
          case 'correct': return '🟩';
          case 'present': return '🟨';
          default: return '⬜';
        }
      })
      .join(''),
  );
  const header = `Tiny Times Wordle ${state.won ? state.currentRow : 'X'}/${MAX_GUESSES}`;
  return `${header}\n\n${rows.join('\n')}`;
}

export const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

export { WORD_LENGTH, MAX_GUESSES };
