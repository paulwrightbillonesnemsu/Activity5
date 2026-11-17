import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider, useApp } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CounterScreen from './src/screens/CounterScreen';
import TimerScreen from './src/screens/TimerScreen';
import TodoScreen from './src/screens/TodoScreen';
import LayoutScreen from './src/screens/LayoutScreen';

const Stack = createNativeStackNavigator();

// Lives inside <AppProvider> so the navigation chrome (header, background)
// also follows the global Dark/Light theme.
function RootNavigator() {
  const { theme, isDark } = useApp();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.primary,
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.border,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: theme.surface },
          headerTintColor: theme.text,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Lab Dashboard' }} />
        <Stack.Screen name="Counter" component={CounterScreen} options={{ title: 'Lab 1: Counter' }} />
        <Stack.Screen name="Timer" component={TimerScreen} options={{ title: 'Lab 2: Timer' }} />
        <Stack.Screen name="Todo" component={TodoScreen} options={{ title: 'Lab 3: To-Do List' }} />
        <Stack.Screen name="Layout" component={LayoutScreen} options={{ title: 'Lab 4: Flexbox' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}
