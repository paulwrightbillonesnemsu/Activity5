import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Heading from '../components/Heading';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';

function format(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

// Lab 2: useEffect with an interval and proper cleanup.
export default function TimerScreen() {
  const { theme } = useApp();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id); // cleanup when paused or unmounted
  }, [running]);

  return (
    <ScreenContainer>
      <Card style={styles.center}>
        <Heading kind="muted">Stopwatch</Heading>
        <Heading kind="title" style={[styles.time, { color: theme.primary }]}>
          {format(seconds)}
        </Heading>
        <Heading kind="muted">{running ? 'Running…' : 'Paused'}</Heading>

        <View style={styles.row}>
          <AppButton
            title={running ? 'Pause' : 'Start'}
            style={styles.flex}
            onPress={() => setRunning((r) => !r)}
          />
          <AppButton
            title="Reset"
            variant="outline"
            style={styles.flex}
            onPress={() => {
              setRunning(false);
              setSeconds(0);
            }}
          />
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  time: { fontSize: 64, marginVertical: 8 },
  row: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 18,
  },
  flex: { flex: 1 },
});
