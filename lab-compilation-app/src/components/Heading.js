import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useApp } from '../context/AppContext';

// Reusable themed text. kind: 'title' | 'section' | 'body' | 'muted'
export default function Heading({ children, kind = 'section', style }) {
  const { theme } = useApp();
  const color = kind === 'muted' ? theme.textMuted : theme.text;
  return <Text style={[styles[kind], { color }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '800', marginBottom: 4 },
  section: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  body: { fontSize: 15, lineHeight: 22 },
  muted: { fontSize: 14, lineHeight: 20 },
});
