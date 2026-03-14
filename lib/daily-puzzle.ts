/**
 * Deterministic daily puzzle selector.
 * Uses the date to pick a puzzle index — no server needed.
 */

const EPOCH = new Date('2025-01-01').getTime();

function getDayIndex(): number {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.floor((startOfDay - EPOCH) / (1000 * 60 * 60 * 24));
}

/** Returns today's date string in YYYY-MM-DD format */
export function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/** Pick today's puzzle from an array, cycling through */
export function getDailyPuzzle<T>(puzzles: T[]): T {
  const index = getDayIndex() % puzzles.length;
  return puzzles[Math.abs(index)];
}

/** Pick today's puzzle index */
export function getDailyPuzzleIndex(total: number): number {
  return Math.abs(getDayIndex() % total);
}

/** Pick N items from an array deterministically based on today's date */
export function getDailySelection<T>(items: T[], count: number): T[] {
  const dayIndex = getDayIndex();
  const result: T[] = [];
  const used = new Set<number>();

  // Simple deterministic shuffle seeded by day
  let seed = Math.abs(dayIndex * 2654435761); // Knuth multiplicative hash
  for (let i = 0; i < count && i < items.length; i++) {
    seed = (seed * 1664525 + 1013904223) & 0x7fffffff;
    let idx = seed % items.length;
    while (used.has(idx)) {
      idx = (idx + 1) % items.length;
    }
    used.add(idx);
    result.push(items[idx]);
  }

  return result;
}
