import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, BorderRadius } from '@/constants/theme';
import { Header } from '@/components/Header';
import { Confetti } from '@/components/Confetti';
import {
  WordleGameState,
  TileState,
  createWordleGame,
  addLetter,
  removeLetter,
  submitGuess,
  getShareText,
  KEYBOARD_ROWS,
  MAX_GUESSES,
  LetterStatus,
} from '@/lib/wordle-game';
import { recordGameResult } from '@/lib/rewards';
import { tapFeedback, submitFeedback, successFeedback, errorFeedback } from '@/lib/haptics';

function tileColor(status: LetterStatus): string {
  switch (status) {
    case 'correct': return Colors.correct;
    case 'present': return Colors.present;
    case 'absent': return Colors.absent;
    default: return Colors.tileDefault;
  }
}

function tileTextColor(status: LetterStatus): string {
  return status === 'empty' || status === 'absent' ? Colors.text : Colors.textOnPrimary;
}

interface AnimatedWordleTileProps {
  tile: TileState;
  colIdx: number;
}

function AnimatedWordleTile({ tile, colIdx }: AnimatedWordleTileProps) {
  const rotation = useSharedValue(0);
  const previousStatus = useRef(tile.status);

  useEffect(() => {
    if (previousStatus.current === 'empty' && tile.status !== 'empty') {
      rotation.value = 0;
      rotation.value = withDelay(
        colIdx * 100,
        withSequence(
          withTiming(90, { duration: 160, easing: Easing.inOut(Easing.ease) }),
          withTiming(180, { duration: 160, easing: Easing.inOut(Easing.ease) }),
        ),
      );
    } else if (tile.status === 'empty') {
      rotation.value = 0;
    }

    previousStatus.current = tile.status;
  }, [colIdx, rotation, tile.status]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 900 }, { rotateX: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.tileWrapper, animatedStyle]}>
      <View
        style={[
          styles.tileFace,
          styles.tileFront,
          { borderColor: tile.letter ? Colors.textLight : Colors.border },
        ]}
      >
        <Text style={[styles.tileLetter, { color: Colors.text }]}>{tile.letter}</Text>
      </View>
      <View
        style={[
          styles.tileFace,
          styles.tileBack,
          {
            backgroundColor: tileColor(tile.status),
            borderColor: tileColor(tile.status),
          },
        ]}
      >
        <Text style={[styles.tileLetter, { color: tileTextColor(tile.status) }]}>{tile.letter}</Text>
      </View>
    </Animated.View>
  );
}

interface AnimatedWordleRowProps {
  children: React.ReactNode;
  shouldShake: boolean;
}

function AnimatedWordleRow({ children, shouldShake }: AnimatedWordleRowProps) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (shouldShake) {
      translateX.value = withSequence(
        withTiming(-10, { duration: 40 }),
        withTiming(10, { duration: 40 }),
        withTiming(-10, { duration: 40 }),
        withTiming(0, { duration: 40 }),
      );
    } else {
      translateX.value = 0;
    }
  }, [shouldShake, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return <Animated.View style={[styles.row, animatedStyle]}>{children}</Animated.View>;
}

export default function WordleScreen() {
  const [game, setGame] = useState<WordleGameState>(createWordleGame);
  const [shakeRow, setShakeRow] = useState(-1);

  useEffect(() => {
    if (shakeRow < 0) return;

    const timeout = setTimeout(() => setShakeRow(-1), 500);
    return () => clearTimeout(timeout);
  }, [shakeRow]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (game.gameOver) return;

      if (key === '⌫') {
        setGame((g) => removeLetter(g));
        return;
      }

      if (key === 'ENTER') {
        submitFeedback();
        setGame((g) => {
          const result = submitGuess(g);
          if ('error' in result) {
            errorFeedback();
            setShakeRow(g.currentRow);
            return g;
          }
          if (result.gameOver) {
            const stars = result.won ? Math.max(1, MAX_GUESSES - result.currentRow + 1) : 0;
            recordGameResult('wordle', result.won, stars);
            if (result.won) {
              successFeedback();
            }
          }
          return result;
        });
        return;
      }

      tapFeedback();
      setGame((g) => addLetter(g, key));
    },
    [game.gameOver],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Confetti visible={game.won} />
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <Header emoji="🟩" title="Kid Wordle" subtitle="Guess the 4-letter word in 6 tries!" />

        {/* Tile Grid */}
        <View style={styles.grid}>
          {game.guesses.map((row, rowIdx) => (
            <AnimatedWordleRow key={rowIdx} shouldShake={shakeRow === rowIdx}>
              {row.map((tile, colIdx) => (
                <AnimatedWordleTile key={colIdx} tile={tile} colIdx={colIdx} />
              ))}
            </AnimatedWordleRow>
          ))}
        </View>

        {/* Game Over */}
        {game.gameOver && (
          <View style={styles.resultBox}>
            <Text style={styles.resultEmoji}>{game.won ? '🎉' : '😢'}</Text>
            <Text style={styles.resultText}>
              {game.won
                ? `Amazing! You got it in ${game.currentRow}!`
                : `The word was ${game.solution}`}
            </Text>
            <Text style={styles.shareText}>{getShareText(game)}</Text>
            <Text style={styles.comeBack}>Come back tomorrow for a new word!</Text>
          </View>
        )}

        {/* Keyboard */}
        <View style={styles.keyboard}>
          {KEYBOARD_ROWS.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.keyboardRow}>
              {row.map((key) => {
                const status = game.usedLetters[key];
                const isSpecial = key === 'ENTER' || key === '⌫';
                return (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.key,
                      isSpecial && styles.specialKey,
                      status && { backgroundColor: tileColor(status) },
                    ]}
                    onPress={() => handleKeyPress(key)}
                    activeOpacity={0.6}
                  >
                    <Text
                      style={[
                        styles.keyText,
                        isSpecial && styles.specialKeyText,
                        status && { color: tileTextColor(status) },
                      ]}
                    >
                      {key === 'ENTER' ? '✓' : key}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const TILE_SIZE = 64;
const TILE_GAP = 6;
const KEY_HEIGHT = 52;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: Spacing['2xl'],
  },
  grid: {
    gap: TILE_GAP,
    marginBottom: Spacing.xl,
  },
  row: {
    flexDirection: 'row',
    gap: TILE_GAP,
  },
  tileWrapper: {
    width: TILE_SIZE,
    height: TILE_SIZE,
  },
  tileFace: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  tileFront: {
    backgroundColor: Colors.tileDefault,
  },
  tileBack: {
    transform: [{ rotateX: '180deg' }],
  },
  tileLetter: {
    ...Typography.tile,
  },
  resultBox: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
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
  shareText: {
    fontFamily: 'monospace',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: Spacing.md,
    color: Colors.text,
  },
  comeBack: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
  keyboard: {
    gap: 6,
    paddingHorizontal: Spacing.sm,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  key: {
    minWidth: 32,
    height: KEY_HEIGHT,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  specialKey: {
    minWidth: 48,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary,
  },
  keyText: {
    ...Typography.keyboard,
    color: Colors.text,
  },
  specialKeyText: {
    color: Colors.textOnPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
});
