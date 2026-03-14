import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { BorderRadius, Spacing } from '@/constants/theme';

interface CardProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  icon?: string;
  completed?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function Card({
  title,
  subtitle,
  accentColor = Colors.primary,
  icon,
  completed = false,
  onPress,
  style,
  children,
}: CardProps) {
  const content = (
    <View style={[styles.container, { borderLeftColor: accentColor }, style]}>
      <View style={styles.header}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <View style={styles.titleArea}>
          <Text style={[styles.title, { color: Colors.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: Colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
        {completed && (
          <View style={[styles.badge, { backgroundColor: Colors.success }]}>
            <Text style={styles.badgeText}>✓</Text>
          </View>
        )}
      </View>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 4,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  titleArea: {
    flex: 1,
  },
  title: {
    ...Typography.h3,
  },
  subtitle: {
    ...Typography.bodySmall,
    marginTop: 2,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: Colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});
