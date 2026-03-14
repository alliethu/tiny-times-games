import { TRIVIA_QUESTIONS, TriviaQuestion, TriviaCategory } from '@/data/trivia-questions';
import { getDailySelection } from './daily-puzzle';

export interface TriviaGameState {
  questions: TriviaQuestion[];
  currentIndex: number;
  answers: (number | null)[];
  revealed: boolean;
  score: number;
  gameOver: boolean;
}

const QUESTIONS_PER_DAY = 10;

export function createTriviaGame(): TriviaGameState {
  // Get 2 from each category for a balanced mix
  const categories: TriviaCategory[] = ['animals', 'science', 'sports', 'geography', 'pop-culture'];
  const questions: TriviaQuestion[] = [];

  for (const cat of categories) {
    const catQuestions = TRIVIA_QUESTIONS.filter((q) => q.category === cat);
    const selected = getDailySelection(catQuestions, 2);
    questions.push(...selected);
  }

  return {
    questions,
    currentIndex: 0,
    answers: new Array(QUESTIONS_PER_DAY).fill(null),
    revealed: false,
    score: 0,
    gameOver: false,
  };
}

export function selectAnswer(state: TriviaGameState, choiceIndex: number): TriviaGameState {
  if (state.gameOver || state.revealed) return state;

  const newAnswers = [...state.answers];
  newAnswers[state.currentIndex] = choiceIndex;

  const isCorrect = choiceIndex === state.questions[state.currentIndex].correctIndex;

  return {
    ...state,
    answers: newAnswers,
    revealed: true,
    score: state.score + (isCorrect ? 1 : 0),
  };
}

export function nextQuestion(state: TriviaGameState): TriviaGameState {
  if (!state.revealed) return state;

  const nextIndex = state.currentIndex + 1;
  const gameOver = nextIndex >= state.questions.length;

  return {
    ...state,
    currentIndex: gameOver ? state.currentIndex : nextIndex,
    revealed: false,
    gameOver,
  };
}

export function getStarsForScore(score: number): number {
  if (score === 10) return 5;
  if (score >= 9) return 4;
  if (score >= 7) return 3;
  if (score >= 5) return 2;
  if (score >= 3) return 1;
  return 0;
}

export function getCategoryEmoji(category: TriviaCategory): string {
  switch (category) {
    case 'animals': return '🐾';
    case 'science': return '🔬';
    case 'sports': return '⚽';
    case 'geography': return '🌍';
    case 'pop-culture': return '🎬';
  }
}

export { QUESTIONS_PER_DAY };
