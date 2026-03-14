import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, BorderRadius } from '@/constants/theme';
import { Header } from '@/components/Header';
import {
  CrosswordGameState,
  createCrosswordGame,
  selectCell,
  inputLetter,
  deleteLetter,
  getElapsed,
  formatTime,
} from '@/lib/crossword-game';
import { recordGameResult } from '@/lib/rewards';

const GRID_SIZE = 5;
const CELL_SIZE = 60;
const CELL_GAP = 2;

const KEYBOARD = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

export default function CrosswordScreen() {
  const [game, setGame] = useState<CrosswordGameState>(createCrosswordGame);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (game.gameOver) return;
    const interval = setInterval(() => {
      setTimer(getElapsed(game));
    }, 1000);
    return () => clearInterval(interval);
  }, [game.gameOver, game.startTime]);

  const handleCellPress = useCallback((row: number, col: number) => {
    setGame((g) => selectCell(g, row, col));
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    if (key === '⌫') {
      setGame((g) => deleteLetter(g));
    } else {
      setGame((g) => {
        const result = inputLetter(g, key);
        if (result.gameOver && result.won) {
          const elapsed = getElapsed(result);
          const stars = elapsed < 60 ? 5 : elapsed < 120 ? 3 : elapsed < 300 ? 2 : 1;
          recordGameResult('crossword', true, stars);
        }
        return result;
      });
    }
  }, []);

  const isHighlighted = (row: number, col: number) => {
    if (!game.activeClue) return false;
    const c = game.activeClue;
    if (c.direction === 'across') {
      return row === c.row && col >= c.col && col < c.col + c.answer.length;
    }
    return col === c.col && row >= c.row && row < c.row + c.answer.length;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <Header emoji="✏️" title="Mini Crossword" subtitle="Fill in the puzzle!" />

        {/* Timer */}
        <Text style={styles.timer}>{formatTime(timer)}</Text>

        {/* Active Clue */}
        {game.activeClue && (
          <View style={styles.clueBar}>
            <Text style={styles.clueNumber}>
              {game.activeClue.number}{game.activeClue.direction === 'across' ? 'A' : 'D'}
            </Text>
            <Text style={styles.clueText}>{game.activeClue.clue}</Text>
          </View>
        )}

        {/* Grid */}
        <View style={styles.grid}>
          {game.grid.map((row, r) => (
            <View key={r} style={styles.gridRow}>
              {row.map((cell, c) => {
                const isSelected = r === game.selectedRow && c === game.selectedCol;
                const highlighted = isHighlighted(r, c);

                if (cell.isBlack) {
                  return <View key={c} style={[styles.cell, styles.blackCell]} />;
                }

                return (
                  <TouchableOpacity
                    key={c}
                    style={[
                      styles.cell,
                      highlighted && styles.highlightedCell,
                      isSelected && styles.selectedCell,
                    ]}
                    onPress={() => handleCellPress(r, c)}
                    activeOpacity={0.7}
                  >
                    {cell.number !== undefined && (
                      <Text style={styles.cellNumber}>{cell.number}</Text>
                    )}
                    <Text style={styles.cellLetter}>{cell.letter}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Clue Lists */}
        <View style={styles.clueSection}>
          <Text style={styles.clueSectionTitle}>Across</Text>
          {game.puzzle.clues
            .filter((c) => c.direction === 'across')
            .map((c) => (
              <TouchableOpacity
                key={`a${c.number}`}
                style={styles.clueRow}
                onPress={() => setGame((g) => selectCell(g, c.row, c.col))}
              >
                <Text style={styles.clueListNumber}>{c.number}.</Text>
                <Text style={styles.clueListText}>{c.clue}</Text>
              </TouchableOpacity>
            ))}

          <Text style={[styles.clueSectionTitle, { marginTop: Spacing.md }]}>Down</Text>
          {game.puzzle.clues
            .filter((c) => c.direction === 'down')
            .map((c) => (
              <TouchableOpacity
                key={`d${c.number}`}
                style={styles.clueRow}
                onPress={() => setGame((g) => selectCell(g, c.row, c.col))}
              >
                <Text style={styles.clueListNumber}>{c.number}.</Text>
                <Text style={styles.clueListText}>{c.clue}</Text>
              </TouchableOpacity>
            ))}
        </View>

        {/* Win */}
        {game.won && (
          <View style={styles.resultBox}>
            <Text style={styles.resultEmoji}>🎉</Text>
            <Text style={styles.resultText}>You solved it!</Text>
            <Text style={styles.resultTime}>{formatTime(timer)}</Text>
            <Text style={styles.comeBack}>Come back tomorrow for a new puzzle!</Text>
          </View>
        )}

        {/* Keyboard */}
        <View style={styles.keyboard}>
          {KEYBOARD.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.keyboardRow}>
              {row.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[styles.key, key === '⌫' && styles.specialKey]}
                  onPress={() => handleKeyPress(key)}
                  activeOpacity={0.6}
                >
                  <Text style={[styles.keyText, key === '⌫' && styles.specialKeyText]}>
                    {key}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
  scrollContent: {
    alignItems: 'center',
    paddingBottom: Spacing['3xl'],
  },
  timer: {
    ...Typography.h3,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  clueBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.crosswordLight,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    width: '90%',
  },
  clueNumber: {
    ...Typography.label,
    fontWeight: '700',
    color: Colors.crossword,
    marginRight: Spacing.sm,
  },
  clueText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  grid: {
    gap: CELL_GAP,
    marginBottom: Spacing.xl,
  },
  gridRow: {
    flexDirection: 'row',
    gap: CELL_GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  blackCell: {
    backgroundColor: Colors.text,
    borderColor: Colors.text,
  },
  highlightedCell: {
    backgroundColor: Colors.crosswordLight,
  },
  selectedCell: {
    backgroundColor: Colors.crossword,
  },
  cellNumber: {
    position: 'absolute',
    top: 2,
    left: 4,
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  cellLetter: {
    ...Typography.tile,
    color: Colors.text,
  },
  clueSection: {
    width: '100%',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  clueSectionTitle: {
    ...Typography.label,
    fontWeight: '700',
    color: Colors.crossword,
    marginBottom: Spacing.xs,
  },
  clueRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.xs,
  },
  clueListNumber: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.textSecondary,
    width: 24,
  },
  clueListText: {
    ...Typography.bodySmall,
    color: Colors.text,
    flex: 1,
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
  },
  resultTime: {
    ...Typography.h2,
    color: Colors.crossword,
    marginTop: Spacing.sm,
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
    height: 48,
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
  },
});
