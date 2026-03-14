import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, BorderRadius } from '@/constants/theme';
import { Header } from '@/components/Header';
import { loadRewards, GameType } from '@/lib/rewards';

const GAME_CONFIG: { key: GameType; label: string; emoji: string; color: string }[] = [
  { key: 'wordle', label: 'Kid Wordle', emoji: '🟩', color: Colors.wordle },
  { key: 'spelling-bee', label: 'Spelling Bee', emoji: '🐝', color: Colors.spellingBee },
  { key: 'crossword', label: 'Mini Crossword', emoji: '✏️', color: Colors.crossword },
  { key: 'trivia', label: 'Daily Trivia', emoji: '💡', color: Colors.trivia },
];

export default function StatsScreen() {
  const [rewards, setRewards] = useState<Awaited<ReturnType<typeof loadRewards>> | null>(null);

  useEffect(() => {
    loadRewards().then(setRewards);
  }, []);

  if (!rewards) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header emoji="📊" title="Stats" subtitle="Loading..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header emoji="📊" title="Asher's Stats" subtitle="Keep up the great work!" />

        {/* Overall */}
        <View style={styles.overallCard}>
          <View style={styles.overallRow}>
            <View style={styles.overallStat}>
              <Text style={styles.overallValue}>{rewards.totalStars}</Text>
              <Text style={styles.overallLabel}>⭐ Stars</Text>
            </View>
            <View style={styles.overallStat}>
              <Text style={styles.overallValue}>{rewards.badges.length}</Text>
              <Text style={styles.overallLabel}>🏅 Badges</Text>
            </View>
          </View>
        </View>

        {/* Per game */}
        {GAME_CONFIG.map(({ key, label, emoji, color }) => {
          const stats = rewards.stats[key];
          return (
            <View key={key} style={[styles.gameCard, { borderLeftColor: color }]}>
              <Text style={styles.gameTitle}>
                {emoji} {label}
              </Text>
              <View style={styles.statsGrid}>
                <StatBox label="Played" value={stats.gamesPlayed} />
                <StatBox label="Won" value={stats.gamesWon} />
                <StatBox label="Streak" value={stats.currentStreak} highlight />
                <StatBox label="Best" value={stats.bestStreak} />
                <StatBox label="Stars" value={stats.starsEarned} />
              </View>
            </View>
          );
        })}

        {/* Badges */}
        {rewards.badges.length > 0 && (
          <View style={styles.badgesSection}>
            <Text style={styles.badgesTitle}>🏅 Badges Earned</Text>
            <View style={styles.badgesList}>
              {rewards.badges.map((badge) => (
                <View key={badge} style={styles.badge}>
                  <Text style={styles.badgeText}>{formatBadge(badge)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <View style={styles.statBox}>
      <Text style={[styles.statValue, highlight && { color: Colors.primary }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function formatBadge(badge: string): string {
  const [game, duration] = badge.split('-').reduce(
    (acc, part, i, arr) => {
      if (i < arr.length - 1) {
        acc[0] += (acc[0] ? '-' : '') + part;
      } else {
        acc[1] = part;
      }
      return acc;
    },
    ['', ''],
  );

  const gameNames: Record<string, string> = {
    wordle: '🟩 Wordle',
    'spelling-bee': '🐝 Bee',
    crossword: '✏️ Cross',
    trivia: '💡 Trivia',
  };

  return `${gameNames[game] || game} ${duration} streak`;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  overallCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  overallRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overallStat: {
    alignItems: 'center',
  },
  overallValue: {
    ...Typography.hero,
    color: Colors.primary,
  },
  overallLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  gameCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 4,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  gameTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statBox: {
    alignItems: 'center',
    minWidth: 56,
  },
  statValue: {
    ...Typography.h2,
    color: Colors.text,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  badgesSection: {
    marginTop: Spacing.lg,
  },
  badgesTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  badgesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  badge: {
    backgroundColor: Colors.gold,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  badgeText: {
    ...Typography.label,
    color: Colors.text,
    fontWeight: '700',
  },
});
