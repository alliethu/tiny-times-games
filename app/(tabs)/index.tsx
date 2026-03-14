import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/theme';
import { Card } from '@/components/Card';
import { useUser } from '@/lib/user-context';
import { loadRewards } from '@/lib/rewards';

const GAMES = [
  {
    route: '/wordle' as const,
    title: 'Kid Wordle',
    subtitle: 'Guess the 4-letter word!',
    icon: '🟩',
    color: Colors.wordle,
  },
  {
    route: '/spelling-bee' as const,
    title: 'Spelling Bee',
    subtitle: 'How many words can you find?',
    icon: '🐝',
    color: Colors.spellingBee,
  },
  {
    route: '/crossword' as const,
    title: 'Mini Crossword',
    subtitle: 'Fill in the puzzle!',
    icon: '✏️',
    color: Colors.crossword,
  },
  {
    route: '/trivia' as const,
    title: 'Daily Trivia',
    subtitle: '10 fun questions!',
    icon: '💡',
    color: Colors.trivia,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { name } = useUser();
  const [totalStars, setTotalStars] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    loadRewards().then((rewards) => {
      setTotalStars(rewards.totalStars);
      const maxStreak = Math.max(
        ...Object.values(rewards.stats).map((s) => s.currentStreak),
      );
      setBestStreak(maxStreak);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greeting}>
          <Text style={styles.wave}>👋</Text>
          <Text style={styles.greetingText}>Hi {name || 'there'}!</Text>
          <Text style={styles.subtitle}>Ready to play today's games?</Text>
        </View>

        <View style={styles.streakBanner}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakText}>{bestStreak} day streak</Text>
          <Text style={styles.streakEmoji}>⭐</Text>
          <Text style={styles.streakText}>{totalStars} stars</Text>
          <TouchableOpacity onPress={() => router.push('/stats')}>
            <Text style={styles.statsLink}>📊 Stats</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.games}>
          {GAMES.map((game) => (
            <Card
              key={game.route}
              title={game.title}
              subtitle={game.subtitle}
              icon={game.icon}
              accentColor={game.color}
              onPress={() => router.push(game.route)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  greeting: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.lg,
  },
  wave: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  greetingText: {
    ...Typography.hero,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  streakBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  streakEmoji: {
    fontSize: 20,
  },
  streakText: {
    ...Typography.label,
    color: Colors.text,
    marginRight: Spacing.md,
  },
  statsLink: {
    ...Typography.label,
    color: Colors.primary,
    fontWeight: '700',
  },
  games: {
    gap: Spacing.sm,
  },
});
