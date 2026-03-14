import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, BorderRadius } from '@/constants/theme';
import { Button } from '@/components/Button';

interface NamePromptModalProps {
  visible: boolean;
  onSubmit: (name: string) => void;
}

export function NamePromptModal({ visible, onSubmit }: NamePromptModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          <Text style={styles.emoji}>👋</Text>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>What's your name?</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={Colors.textLight}
            value={name}
            onChangeText={setName}
            autoFocus
            maxLength={20}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

          <Button
            title="Let's Play! 🎮"
            onPress={handleSubmit}
            disabled={!name.trim()}
            color={Colors.primary}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing['2xl'],
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  emoji: {
    fontSize: 56,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.hero,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Typography.h3,
    color: Colors.text,
    textAlign: 'center',
  },
});
