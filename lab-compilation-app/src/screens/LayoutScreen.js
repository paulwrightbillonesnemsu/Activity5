import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Heading from '../components/Heading';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';

const JUSTIFY = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'];
const ALIGN = ['flex-start', 'center', 'flex-end', 'stretch'];

function Box({ label, color, tall }) {
  return (
    <View
      style={[
        styles.box,
        { backgroundColor: color },
        tall ? { height: 70 } : null,
      ]}
    >
      <Text style={styles.boxText}>{label}</Text>
    </View>
  );
}

// Lab 4: interactive Flexbox playground.
export default function LayoutScreen() {
  const { theme } = useApp();
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('space-around');
  const [align, setAlign] = useState('center');

  const cycle = (list, current, setter) =>
    setter(list[(list.indexOf(current) + 1) % list.length]);

  return (
    <ScreenContainer>
      <Card>
        <Heading kind="section">Preview</Heading>
        <View
          style={[
            styles.preview,
            {
              flexDirection: direction,
              justifyContent: justify,
              alignItems: align,
              backgroundColor: theme.background,
              borderColor: theme.border,
            },
          ]}
        >
          <Box label="1" color="#6366F1" />
          <Box label="2" color="#EC4899" tall />
          <Box label="3" color="#F59E0B" />
        </View>
      </Card>

      <Card>
        <Heading kind="section">Controls</Heading>

        <Heading kind="muted">flexDirection: {direction}</Heading>
        <AppButton
          title="Toggle direction"
          variant="outline"
          style={styles.control}
          onPress={() =>
            setDirection((d) => (d === 'row' ? 'column' : 'row'))
          }
        />

        <Heading kind="muted">justifyContent: {justify}</Heading>
        <AppButton
          title="Next justifyContent"
          variant="outline"
          style={styles.control}
          onPress={() => cycle(JUSTIFY, justify, setJustify)}
        />

        <Heading kind="muted">alignItems: {align}</Heading>
        <AppButton
          title="Next alignItems"
          variant="outline"
          style={styles.control}
          onPress={() => cycle(ALIGN, align, setAlign)}
        />
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  preview: {
    height: 260,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  box: {
    width: 56,
    height: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: { color: '#FFFFFF', fontWeight: '800', fontSize: 18 },
  control: { marginTop: 6, marginBottom: 14 },
});
