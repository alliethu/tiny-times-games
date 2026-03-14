import React, { useState, useCallback } from 'react';
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
import { Button } from '@/components/Button';
import {
  TriviaGameState,
  createTriviaGame,
  selectAnswer,
  nextQuestion,
  getStarsForScore,
  getCategoryEmoji,
  QUESTIONS_PER_DAY,
} from '@/lib/trivia-game';
import { recordGameResult } from '@/lib/rewards';

export default function TriviaScreen() {
  const [game, setGame] = useState<TriviaGameState>(createTriviaGame);

  const handleSelectAnswer = useCallback((index: number) => {
    setGame((g) => selectAnswer(g, index));
  }, []);

  const handleNext = useCallback(() => {
    setGame((g) => {
      const result = nextQuestion(g);
      if (result.gameOver) {
        const stars = getStarsForScore(result.score);
        recordGameResult('trivia', result.score >= 5, stars);
      }
      return result;
    });
  }, []);

  if (game.gameOver) {
    const stars = getStarsForScore(game.score);
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Header emoji="💡" title="Daily Trivia" subtitle="Results" />

          <View style={styles.resultBox}>
            <Text style={styles.resultEmoji}>
              {game.score === 10 ? '🏆' : game.score >= 8 ? '🌟' : game.score >= 5 ? '👍' : '💪'}
            </Text>
            <Text style={styles.scoreHero}>{game.score}/{QUESTIONS_PER_DAY}</Text>
            <Text style={styles.resultLabel}>
              {game.score === 10
                ? 'PERFECT SCORE!'
                : game.score >= 8
                  ? 'Amazing!'
                  : game.score >= 5
                    ? 'Great job!'
                    : 'Keep learning!'}
            </Text>

            <View style={styles.starsRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Text key={i} style={styles.starIcon}>
                  {i < stars ? '⭐' : '☆'}
                </Text>
              ))}
            </View>

            <Text style={styles.comeBack}>Come back tomorrow for more trivia!</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const question = game.questions[game.currentIndex];
  const selectedAnswer = game.answers[game.currentIndex];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <Header emoji="💡" title="Daily Trivia" subtitle="10 fun questions!" />

        {/* Progress dots */}
        <View style={styles.progressRow}>
          {Array.from({ length: QUESTIONS_PER_DAY }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressDot,
                i === game.currentIndex && styles.progressDotActive,
                i < game.currentIndex && {
                  backgroundColor:
                    game.answers[i] === game.questions[i].correctIndex
                      ? Colors.success
                      : Colors.error,
                },
              ]}
            />
          ))}
        </View>

        {/* Question */}
        <View style={styles.questionCard}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryEmoji}>{getCategoryEmoji(question.category)}</Text>
            <Text style={styles.categoryText}>{question.category.replace('-', ' ')}</Text>
          </View>

          <Text style={styles.questionNumber}>
            Question {game.currentIndex + 1} of {QUESTIONS_PER_DAY}
          </Text>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* Answer choices */}
        <View style={styles.choices}>
          {question.choices.map((choice, i) => {
            let bg: string = Colors.surface;
            let borderColor: string = Colors.border;
            let textColor: string = Colors.text;

            if (game.revealed) {
              if (i === question.correctIndex) {
                bg = Colors.success;
                borderColor = Colors.success;
                textColor = Colors.textOnPrimary;
              } else if (i === selectedAnswer && i !== question.correctIndex) {
                bg = Colors.error;
                borderColor = Colors.error;
                textColor = Colors.textOnPrimary;
              }
            } else if (i === selectedAnswer) {
              borderColor = Colors.trivia;
            }

            return (
              <TouchableOpacity
                key={i}
                style={[styles.choiceButton, { backgroundColor: bg, borderColor }]}
                onPress={() => handleSelectAnswer(i)}
                disabled={game.revealed}
                activeOpacity={0.7}
              >
                <Text style={[styles.choiceLetter, { color: textColor }]}>
                  {String.fromCharCode(65 + i)}
                </Text>
                <Text style={[styles.choiceText, { color: textColor }]}>{choice}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Fun fact (shown after answering) */}
        {game.revealed && (
          <View style={styles.funFact}>
            <Text style={styles.funFactLabel}>💡 Fun Fact</Text>
            <Text style={styles.funFactText}>{question.funFact}</Text>
          </View>
        )}

        {/* Next button */}
        {game.revealed && (
          <View style={styles.nextRow}>
            <Button
              title={game.currentIndex === QUESTIONS_PER_DAY - 1 ? 'See Results' : 'Next Question'}
              onPress={handleNext}
              color={Colors.trivia}
            />
          </View>
        )}
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
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: Spacing.xl,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.border,
  },
  progressDotActive: {
    backgroundColor: Colors.trivia,
    transform: [{ scale: 1.3 }],
  },
  questionCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    width: '90%',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
    gap: 4,
  },
  categoryEmoji: {
    fontSize: 14,
  },
  categoryText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  questionNumber: {
    ...Typography.caption,
    color: Colors.textLight,
    marginBottom: Spacing.sm,
  },
  questionText: {
    ...Typography.h3,
    color: Colors.text,
  },
  choices: {
    width: '90%',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  choiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    minHeight: 56,
  },
  choiceLetter: {
    ...Typography.label,
    fontWeight: '700',
    width: 28,
  },
  choiceText: {
    ...Typography.body,
    flex: 1,
  },
  funFact: {
    backgroundColor: '#FFF9E6',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    width: '90%',
    borderLeftWidth: 4,
    borderLeftColor: Colors.spellingBee,
  },
  funFactLabel: {
    ...Typography.label,
    fontWeight: '700',
    color: Colors.spellingBee,
    marginBottom: Spacing.xs,
  },
  funFactText: {
    ...Typography.bodySmall,
    color: Colors.text,
  },
  nextRow: {
    width: '90%',
    paddingHorizontal: Spacing.xl,
  },
  resultBox: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing['2xl'],
    marginHorizontal: Spacing.xl,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  scoreHero: {
    ...Typography.hero,
    color: Colors.trivia,
  },
  resultLabel: {
    ...Typography.h3,
    color: Colors.text,
    marginTop: Spacing.sm,
  },
  starsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  starIcon: {
    fontSize: 32,
  },
  comeBack: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xl,
  },
});
