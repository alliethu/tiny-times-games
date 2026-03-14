import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, BorderRadius, MIN_TOUCH_TARGET } from '@/constants/theme';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import {
  WordleGameState,
  createWordleGame,
  addLetter,
  removeLetter,
  submitGuess,
  getShareText,
  KEYBOARD_ROWS,
  WORD_LENGTH,
  MAX_GUESSES,
  LetterStatus,
} from '@/lib/wordle-game';
import { recordGameResult } from '@/lib/rewards';

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

export default function WordleScreen() {
  const [game, setGame] = useState<WordleGameState>(createWordleGame);
  const [shakeRow, setShakeRow] = useState(-1);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (game.gameOver) return;

      if (key === '⌫') {
        setGame((g) => removeLetter(g));
        return;
      }

      if (key === 'ENTER') {
        setGame((g) => {
          const result = submitGuess(g);
          if ('error' in result) {
            setShakeRow(g.currentRow);
            setTimeout(() => setShakeRow(-1), 500);
            return g;
          }
          if (result.gameOver) {
            const stars = result.won ? Math.max(1, MAX_GUESSES - result.currentRow + 1) : 0;
            recordGameResult('wordle', result.won, stars);
          }
          return result;
        });
        return;
      }

      setGame((g) => addLetter(g, key));
    },
    [game.gameOver],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <Header emoji="🟩" title="Kid Wordle" subtitle="Guess the 4-letter word in 6 tries!" />

        {/* Tile Grid */}
        <View style={styles.grid}>
          {game.guesses.map((row, rowIdx) => (
            <View key={rowIdx} style={[styles.row, shakeRow === rowIdx && styles.shake]}>
              {row.map((tile, colIdx) => (
                <View
                  key={colIdx}
                  style={[
                    styles.tile,
                    {
                      backgroundColor: tileColor(tile.status),
                      borderColor: tile.letter ? Colors.textLight : Colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.tileLetter, { color: tileTextColor(tile.status) }]}>
                    {tile.letter}
                  </Text>
                </View>
              ))}
            </View>
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
  shake: {
    // Placeholder — Reanimated shake anim will replace this
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
