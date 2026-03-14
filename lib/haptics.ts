import { Platform } from 'react-native';

function isHapticsAvailable(): boolean {
  return Platform.OS !== 'web';
}

let Haptics: typeof import('expo-haptics') | null = null;

if (isHapticsAvailable()) {
  Haptics = require('expo-haptics');
}

/** Light tap feedback — for key/button presses */
export function tapFeedback() {
  if (Haptics) void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

/** Medium feedback — for submitting a word/answer */
export function submitFeedback() {
  if (Haptics) void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

/** Success feedback — for correct answers, wins */
export function successFeedback() {
  if (Haptics) void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

/** Error feedback — for wrong answers, invalid words */
export function errorFeedback() {
  if (Haptics) void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
}

/** Warning feedback — for "not a word", "too short" */
export function warningFeedback() {
  if (Haptics) void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
}
