import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, BorderRadius } from '@/constants/theme';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { Confetti } from '@/components/Confetti';
import {
  BeeGameState,
  BeeRank,
  RANK_THRESHOLDS,
  createBeeGame,
  addBeeLetter,
  removeBeeLastLetter,
  shuffleBeeLetters,
  submitBeeWord,
} from '@/lib/spelling-bee-game';
import { recordGameResult } from '@/lib/rewards';
import { tapFeedback, successFeedback, errorFeedback } from '@/lib/haptics';

const RANK_COLORS: Record<BeeRank, string> = {
  Beginner: Colors.textLight,
  Good: Colors.info,
  Great: Colors.spellingBee,
  Amazing: Colors.wordle,
  Genius: Colors.primary,
};

interface AnimatedHexCellProps {
  letter: string;
  onPress: () => void;
  isCenter?: boolean;
}

function AnimatedHexCell({ letter, onPress, isCenter = false }: AnimatedHexCellProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(() => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 80 }),
      withTiming(1, { duration: 80 }),
    );
    onPress();
  }, [onPress, scale]);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[styles.hexCell, isCenter ? styles.centerCell : styles.outerCell]}
        onPress={handlePress}
        activeOpacity={0.6}
      >
        <Text style={[styles.hexLetter, isCenter && styles.centerLetter]}>{letter}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function SpellingBeeScreen() {
  const [game, setGame] = useState<BeeGameState>(createBeeGame);
  const [showWords, setShowWords] = useState(false);

  const handleLetterPress = useCallback((letter: string) => {
    tapFeedback();
    setGame((g) => addBeeLetter(g, letter));
  }, []);

  const handleSubmit = useCallback(() => {
    setGame((g) => {
      const result = submitBeeWord(g);
      const foundNewWord = result.foundWords.length > g.foundWords.length;

      if (result.message === '🎉 PANGRAM!') {
        successFeedback();
      } else if (foundNewWord) {
        successFeedback();
      } else {
        errorFeedback();
      }

      if (result.gameOver) {
        recordGameResult('spelling-bee', true, 5);
      }
      return result;
    });
  }, []);

  const progressPct = game.maxScore > 0 ? game.score / game.maxScore : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <Confetti visible={game.gameOver} />
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <Header emoji="🐝" title="Spelling Bee" subtitle="How many words can you find?" />

        {/* Rank & Progress */}
        <View style={styles.rankBar}>
          <Text style={[styles.rankText, { color: RANK_COLORS[game.rank] }]}>{game.rank}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min(100, progressPct * 100)}%` }]} />
            {RANK_THRESHOLDS.map((t) => (
              <View
                key={t.rank}
                style={[styles.progressDot, { left: `${t.pct * 100}%` }]}
              />
            ))}
          </View>
          <Text style={styles.scoreText}>{game.score}</Text>
        </View>

        {/* Message */}
        {game.message && (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{game.message}</Text>
          </View>
        )}

        {/* Current Input */}
        <View style={styles.inputRow}>
          <Text style={styles.inputText}>
            {game.currentInput || ' '}
          </Text>
        </View>

        {/* Honeycomb */}
        <View style={styles.honeycomb}>
          {/* Top row: 2 letters */}
          <View style={styles.hexRow}>
            {game.puzzle.outerLetters.slice(0, 2).map((letter, i) => (
              <AnimatedHexCell
                key={`${letter}-${i}`}
                letter={letter}
                onPress={() => handleLetterPress(letter)}
              />
            ))}
          </View>

          {/* Middle row: outer + CENTER + outer */}
          <View style={styles.hexRow}>
            <AnimatedHexCell
              letter={game.puzzle.outerLetters[2]}
              onPress={() => handleLetterPress(game.puzzle.outerLetters[2])}
            />
            <AnimatedHexCell
              letter={game.puzzle.centerLetter}
              onPress={() => handleLetterPress(game.puzzle.centerLetter)}
              isCenter
            />
            <AnimatedHexCell
              letter={game.puzzle.outerLetters[3]}
              onPress={() => handleLetterPress(game.puzzle.outerLetters[3])}
            />
          </View>

          {/* Bottom row: 2 letters */}
          <View style={styles.hexRow}>
            {game.puzzle.outerLetters.slice(4, 6).map((letter, i) => (
              <AnimatedHexCell
                key={`${letter}-${i + 4}`}
                letter={letter}
                onPress={() => handleLetterPress(letter)}
              />
            ))}
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <Button title="Delete" variant="outline" size="sm" onPress={() => setGame((g) => removeBeeLastLetter(g))} />
          <Button title="Shuffle" variant="outline" size="sm" onPress={() => setGame((g) => shuffleBeeLetters(g))} />
          <Button title="Enter" variant="primary" size="sm" color={Colors.spellingBee} onPress={handleSubmit} />
        </View>

        {/* Found Words */}
        <TouchableOpacity style={styles.foundHeader} onPress={() => setShowWords(!showWords)}>
          <Text style={styles.foundTitle}>
            Found: {game.foundWords.length}/{game.puzzle.words.length}
          </Text>
          <Text style={styles.foundToggle}>{showWords ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showWords && (
          <View style={styles.wordList}>
            {game.foundWords.map((word) => (
              <View key={word} style={styles.wordChip}>
                <Text style={styles.wordChipText}>
                  {game.puzzle.pangrams.includes(word) ? `⭐ ${word}` : word}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Game Over */}
        {game.gameOver && (
          <View style={styles.resultBox}>
            <Text style={styles.resultEmoji}>🎉</Text>
            <Text style={styles.resultText}>You found ALL the words!</Text>
            <Text style={styles.comeBack}>Come back tomorrow for new letters!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const HEX_SIZE = 68;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: Spacing['3xl'],
  },
  rankBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
    width: '100%',
  },
  rankText: {
    ...Typography.label,
    fontWeight: '700',
    width: 70,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 4,
    overflow: 'visible',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.spellingBee,
    borderRadius: 4,
  },
  progressDot: {
    position: 'absolute',
    top: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    marginLeft: -6,
  },
  scoreText: {
    ...Typography.label,
    color: Colors.text,
    fontWeight: '700',
    width: 30,
    textAlign: 'right',
  },
  messageBubble: {
    backgroundColor: Colors.text,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
  },
  messageText: {
    ...Typography.label,
    color: Colors.textOnDark,
    fontWeight: '700',
  },
  inputRow: {
    minHeight: 48,
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  inputText: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: 4,
  },
  honeycomb: {
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.xl,
  },
  hexRow: {
    flexDirection: 'row',
    gap: 8,
  },
  hexCell: {
    width: HEX_SIZE,
    height: HEX_SIZE,
    borderRadius: HEX_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCell: {
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  centerCell: {
    backgroundColor: Colors.spellingBee,
  },
  hexLetter: {
    ...Typography.tile,
    color: Colors.text,
  },
  centerLetter: {
    color: Colors.textOnPrimary,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  foundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    width: '100%',
  },
  foundTitle: {
    ...Typography.label,
    color: Colors.textSecondary,
  },
  foundToggle: {
    fontSize: 12,
    color: Colors.textLight,
  },
  wordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    width: '100%',
  },
  wordChip: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  wordChipText: {
    ...Typography.label,
    color: Colors.text,
  },
  resultBox: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  resultEmoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  resultText: {
    ...Typography.h3,
    color: Colors.text,
    textAlign: 'center',
  },
  comeBack: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
});
