import { CROSSWORD_PUZZLES, CrosswordPuzzle, CrosswordClue } from '@/data/crossword-puzzles';
import { getDailyPuzzleIndex } from './daily-puzzle';

export type Direction = 'across' | 'down';

export interface CellState {
  letter: string;
  isBlack: boolean;
  isCorrect: boolean;
  number?: number;
}

export interface CrosswordGameState {
  puzzle: CrosswordPuzzle;
  grid: CellState[][];
  selectedRow: number;
  selectedCol: number;
  direction: Direction;
  activeClue: CrosswordClue | null;
  gameOver: boolean;
  won: boolean;
  startTime: number;
  elapsedSeconds: number;
}

export function createCrosswordGame(): CrosswordGameState {
  const index = getDailyPuzzleIndex(CROSSWORD_PUZZLES.length);
  const puzzle = CROSSWORD_PUZZLES[index];

  // Build cell number map from clues
  const numberMap = new Map<string, number>();
  for (const clue of puzzle.clues) {
    const key = `${clue.row},${clue.col}`;
    if (!numberMap.has(key)) {
      numberMap.set(key, clue.number);
    }
  }

  const grid: CellState[][] = puzzle.grid.map((row, r) =>
    row.map((cell, c) => ({
      letter: '',
      isBlack: cell === '#',
      isCorrect: false,
      number: numberMap.get(`${r},${c}`),
    })),
  );

  // Find first non-black cell
  let startRow = 0;
  let startCol = 0;
  outer: for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (!grid[r][c].isBlack) {
        startRow = r;
        startCol = c;
        break outer;
      }
    }
  }

  const firstClue = puzzle.clues.find(
    (cl) => cl.direction === 'across' && cl.row === startRow && cl.col <= startCol,
  ) || puzzle.clues[0];

  return {
    puzzle,
    grid,
    selectedRow: startRow,
    selectedCol: startCol,
    direction: 'across',
    activeClue: firstClue,
    gameOver: false,
    won: false,
    startTime: Date.now(),
    elapsedSeconds: 0,
  };
}

export function selectCell(
  state: CrosswordGameState,
  row: number,
  col: number,
): CrosswordGameState {
  if (state.gameOver || state.grid[row][col].isBlack) return state;

  // If tapping same cell, toggle direction
  const newDirection =
    row === state.selectedRow && col === state.selectedCol
      ? (state.direction === 'across' ? 'down' : 'across')
      : state.direction;

  const activeClue = findClueForCell(state.puzzle.clues, row, col, newDirection);

  return { ...state, selectedRow: row, selectedCol: col, direction: newDirection, activeClue };
}

function findClueForCell(
  clues: CrosswordClue[],
  row: number,
  col: number,
  direction: Direction,
): CrosswordClue | null {
  // Find the clue that contains this cell
  return (
    clues.find((clue) => {
      if (clue.direction !== direction) return false;
      if (direction === 'across') {
        return clue.row === row && col >= clue.col && col < clue.col + clue.answer.length;
      } else {
        return clue.col === col && row >= clue.row && row < clue.row + clue.answer.length;
      }
    }) || null
  );
}

export function inputLetter(
  state: CrosswordGameState,
  letter: string,
): CrosswordGameState {
  if (state.gameOver) return state;
  const { selectedRow, selectedCol, direction, puzzle } = state;
  if (state.grid[selectedRow][selectedCol].isBlack) return state;

  const newGrid = state.grid.map((row) => row.map((cell) => ({ ...cell })));
  newGrid[selectedRow][selectedCol].letter = letter.toUpperCase();

  newGrid[selectedRow][selectedCol].isCorrect =
    newGrid[selectedRow][selectedCol].letter === puzzle.grid[selectedRow][selectedCol];

  // Advance to next cell within the active clue only
  let nextRow = selectedRow;
  let nextCol = selectedCol;

  if (state.activeClue) {
    const clue = state.activeClue;
    if (direction === 'across') {
      const maxCol = clue.col + clue.answer.length - 1;
      if (selectedCol < maxCol) nextCol = selectedCol + 1;
    } else {
      const maxRow = clue.row + clue.answer.length - 1;
      if (selectedRow < maxRow) nextRow = selectedRow + 1;
    }
  }

  const won = checkComplete(newGrid, puzzle);
  const activeClue = findClueForCell(puzzle.clues, nextRow, nextCol, direction) || state.activeClue;

  return {
    ...state,
    grid: newGrid,
    selectedRow: nextRow,
    selectedCol: nextCol,
    activeClue,
    gameOver: won,
    won,
  };
}

export function deleteLetter(state: CrosswordGameState): CrosswordGameState {
  if (state.gameOver) return state;
  const { selectedRow, selectedCol, direction } = state;

  const newGrid = state.grid.map((row) => row.map((cell) => ({ ...cell })));

  if (newGrid[selectedRow][selectedCol].letter) {
    newGrid[selectedRow][selectedCol].letter = '';
    newGrid[selectedRow][selectedCol].isCorrect = false;
    return { ...state, grid: newGrid };
  }

  // Cell already empty — move back within the clue and clear that cell
  if (state.activeClue) {
    const clue = state.activeClue;
    let prevRow = selectedRow;
    let prevCol = selectedCol;

    if (direction === 'across' && selectedCol > clue.col) {
      prevCol = selectedCol - 1;
    } else if (direction === 'down' && selectedRow > clue.row) {
      prevRow = selectedRow - 1;
    }

    if (prevRow !== selectedRow || prevCol !== selectedCol) {
      newGrid[prevRow][prevCol].letter = '';
      newGrid[prevRow][prevCol].isCorrect = false;
      return { ...state, grid: newGrid, selectedRow: prevRow, selectedCol: prevCol };
    }
  }

  return { ...state, grid: newGrid };
}

function checkComplete(grid: CellState[][], puzzle: CrosswordPuzzle): boolean {
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (grid[r][c].isBlack) continue;
      if (grid[r][c].letter !== puzzle.grid[r][c]) return false;
    }
  }
  return true;
}

export function getElapsed(state: CrosswordGameState): number {
  return Math.floor((Date.now() - state.startTime) / 1000);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
