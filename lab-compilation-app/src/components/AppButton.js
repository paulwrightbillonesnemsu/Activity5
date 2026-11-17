import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useApp } from '../context/AppContext';

// Reusable themed button.
// variant: 'primary' (filled) | 'outline' | 'danger'
export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
}) {
  const { theme } = useApp();

  const palette = {
    primary: { bg: theme.primary, fg: theme.primaryText, border: theme.primary },
    outline: { bg: 'transparent', fg: theme.primary, border: theme.primary },
    danger: { bg: theme.danger, fg: '#FFFFFF', border: theme.danger },
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: palette.bg,
          borderColor: palette.border,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: palette.fg }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 16, fontWeight: '600' },
});
