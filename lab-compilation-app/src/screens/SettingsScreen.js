import React from 'react';
import { StyleSheet, Switch, TextInput, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Heading from '../components/Heading';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';

export default function SettingsScreen({ navigation }) {
  const { theme, isDark, toggleTheme, userName, setUserName } = useApp();

  return (
    <ScreenContainer>
      <Card>
        <Heading kind="section">Appearance</Heading>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Heading kind="body">Dark mode</Heading>
            <Heading kind="muted">Updates every screen instantly.</Heading>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
      </Card>

      <Card>
        <Heading kind="section">Profile</Heading>
        <Heading kind="muted" style={styles.label}>
          Display name (shown on the Home Dashboard)
        </Heading>
        <TextInput
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter your name"
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
      </Card>

      <AppButton title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: { flex: 1, paddingRight: 12 },
  label: { marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
});
