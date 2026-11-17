import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Heading from '../components/Heading';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';

// Lab 3: list rendering, controlled input and array state.
export default function TodoScreen() {
  const { theme } = useApp();
  const [text, setText] = useState('');
  const [items, setItems] = useState([
    { id: 1, label: 'Finish React Native lab', done: false },
    { id: 2, label: 'Review Flexbox notes', done: true },
  ]);

  const addItem = () => {
    const label = text.trim();
    if (!label) return;
    setItems((prev) => [...prev, { id: Date.now(), label, done: false }]);
    setText('');
  };

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );

  const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const remaining = items.filter((i) => !i.done).length;

  return (
    <ScreenContainer>
      <Card>
        <View style={styles.inputRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            onSubmitEditing={addItem}
            placeholder="Add a task…"
            placeholderTextColor={theme.textMuted}
            style={[
              styles.input,
              {
                color: theme.text,
                borderColor: theme.border,
                backgroundColor: theme.background,
              },
            ]}
          />
          <AppButton title="Add" onPress={addItem} />
        </View>
      </Card>

      <Heading kind="muted" style={styles.count}>
        {remaining} of {items.length} tasks remaining
      </Heading>

      {items.map((item) => (
        <Card key={item.id} style={styles.itemCard}>
          <Pressable style={styles.itemMain} onPress={() => toggle(item.id)}>
            <Text style={styles.check}>{item.done ? '☑️' : '⬜'}</Text>
            <Text
              style={[
                styles.itemText,
                {
                  color: item.done ? theme.textMuted : theme.text,
                  textDecorationLine: item.done ? 'line-through' : 'none',
                },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
          <Pressable onPress={() => remove(item.id)} hitSlop={10}>
            <Text style={[styles.delete, { color: theme.danger }]}>✕</Text>
          </Pressable>
        </Card>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  count: { marginBottom: 10, marginLeft: 4 },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 10,
  },
  itemMain: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  check: { fontSize: 20, marginRight: 10 },
  itemText: { flex: 1, fontSize: 16 },
  delete: { fontSize: 18, fontWeight: '700', paddingLeft: 12 },
});
