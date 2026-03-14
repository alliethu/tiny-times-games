import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { BorderRadius, MIN_TOUCH_TARGET, Spacing } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  color,
  style,
  textStyle,
}: ButtonProps) {
  const backgroundColor =
    variant === 'primary'
      ? color ?? Colors.primary
      : variant === 'secondary'
        ? Colors.surfaceAlt
        : 'transparent';

  const borderColor =
    variant === 'outline' ? color ?? Colors.primary : 'transparent';

  const textColor =
    variant === 'primary'
      ? Colors.textOnPrimary
      : color ?? Colors.primary;

  const height = size === 'sm' ? MIN_TOUCH_TARGET : size === 'md' ? 56 : 64;
  const fontSize = size === 'sm' ? 14 : size === 'md' ? 18 : 22;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.base,
        {
          backgroundColor: disabled ? Colors.border : backgroundColor,
          borderColor: disabled ? Colors.border : borderColor,
          borderWidth: variant === 'outline' ? 2 : 0,
          height,
          paddingHorizontal: size === 'sm' ? Spacing.lg : Spacing.xl,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: disabled ? Colors.textLight : textColor,
              fontSize,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: MIN_TOUCH_TARGET,
  },
  text: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
