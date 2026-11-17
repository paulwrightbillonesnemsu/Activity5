import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Heading from '../components/Heading';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';

// Lab 1: local state with useState.
export default function CounterScreen() {
  const { theme } = useApp();
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <ScreenContainer>
      <Card style={styles.center}>
        <Heading kind="muted">Current count</Heading>
        <Heading kind="title" style={[styles.count, { color: theme.primary }]}>
          {count}
        </Heading>

        <View style={styles.row}>
          <AppButton
            title={`− ${step}`}
            variant="outline"
            style={styles.flex}
            onPress={() => setCount((c) => c - step)}
          />
          <AppButton
            title={`+ ${step}`}
            style={styles.flex}
            onPress={() => setCount((c) => c + step)}
          />
        </View>

        <AppButton
          title="Reset"
          variant="danger"
          style={styles.fullWidth}
          onPress={() => setCount(0)}
        />
      </Card>

      <Card>
        <Heading kind="section">Step size</Heading>
        <View style={styles.row}>
          {[1, 5, 10].map((s) => (
            <AppButton
              key={s}
              title={String(s)}
              variant={step === s ? 'primary' : 'outline'}
              style={styles.flex}
              onPress={() => setStep(s)}
            />
          ))}
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  count: { fontSize: 72, marginVertical: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    marginBottom: 12,
  },
  flex: { flex: 1 },
  fullWidth: { width: '100%' },
});
