import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodayKey } from './daily-puzzle';

export type GameType = 'wordle' | 'spelling-bee' | 'crossword' | 'trivia';

interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  bestStreak: number;
  starsEarned: number;
  lastPlayedDate: string | null;
}

interface RewardsData {
  totalStars: number;
  badges: string[];
  stats: Record<GameType, GameStats>;
}

const STORAGE_KEY = 'tiny_times_rewards';

const DEFAULT_GAME_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  bestStreak: 0,
  starsEarned: 0,
  lastPlayedDate: null,
};

const DEFAULT_REWARDS: RewardsData = {
  totalStars: 0,
  badges: [],
  stats: {
    wordle: { ...DEFAULT_GAME_STATS },
    'spelling-bee': { ...DEFAULT_GAME_STATS },
    crossword: { ...DEFAULT_GAME_STATS },
    trivia: { ...DEFAULT_GAME_STATS },
  },
};

export async function loadRewards(): Promise<RewardsData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { ...DEFAULT_REWARDS };
}

export async function saveRewards(data: RewardsData): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function recordGameResult(
  game: GameType,
  won: boolean,
  starsEarned: number,
): Promise<RewardsData> {
  const rewards = await loadRewards();
  const stats = rewards.stats[game];
  const today = getTodayKey();

  stats.gamesPlayed += 1;

  if (won) {
    stats.gamesWon += 1;

    // Streak logic: if last played was yesterday, continue streak
    if (stats.lastPlayedDate) {
      const lastDate = new Date(stats.lastPlayedDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diffDays === 1) {
        stats.currentStreak += 1;
      } else if (diffDays > 1) {
        stats.currentStreak = 1;
      }
      // diffDays === 0 means already played today, don't change streak
    } else {
      stats.currentStreak = 1;
    }

    stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
  } else {
    stats.currentStreak = 0;
  }

  stats.starsEarned += starsEarned;
  stats.lastPlayedDate = today;
  rewards.totalStars += starsEarned;

  // Check for milestone badges
  const streakBadges = [
    { streak: 3, badge: `${game}-3day` },
    { streak: 7, badge: `${game}-7day` },
    { streak: 30, badge: `${game}-30day` },
  ];
  for (const { streak, badge } of streakBadges) {
    if (stats.currentStreak >= streak && !rewards.badges.includes(badge)) {
      rewards.badges.push(badge);
    }
  }

  await saveRewards(rewards);
  return rewards;
}

export async function hasPlayedToday(game: GameType): Promise<boolean> {
  const rewards = await loadRewards();
  return rewards.stats[game].lastPlayedDate === getTodayKey();
}

/** Check completion status for all games today */
export async function getTodayStatus(): Promise<Record<GameType, boolean>> {
  const rewards = await loadRewards();
  const today = getTodayKey();
  return {
    wordle: rewards.stats.wordle.lastPlayedDate === today,
    'spelling-bee': rewards.stats['spelling-bee'].lastPlayedDate === today,
    crossword: rewards.stats.crossword.lastPlayedDate === today,
    trivia: rewards.stats.trivia.lastPlayedDate === today,
  };
}
