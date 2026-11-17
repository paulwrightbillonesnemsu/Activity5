import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../theme/themes';

// ---------------------------------------------------------------------------
// Global state (React Context API)
//   - isDark:      Dark / Light theme toggle
//   - userName:    profile name shown on the Home Dashboard
// Both values are persisted with AsyncStorage so they survive app restarts.
// ---------------------------------------------------------------------------

const STORAGE_KEY = '@lab_app_settings_v1';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [userName, setUserName] = useState('Student');
  const [loaded, setLoaded] = useState(false);

  // Load saved settings once on startup.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          if (typeof saved.isDark === 'boolean') setIsDark(saved.isDark);
          if (typeof saved.userName === 'string') setUserName(saved.userName);
        }
      } catch (e) {
        // Ignore storage errors; defaults are fine.
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Save whenever a setting changes (after the initial load).
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ isDark, userName })).catch(
      () => {}
    );
  }, [isDark, userName, loaded]);

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

  const value = useMemo(
    () => ({
      isDark,
      theme: isDark ? darkTheme : lightTheme,
      toggleTheme,
      userName,
      setUserName,
    }),
    [isDark, toggleTheme, userName]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside <AppProvider>');
  }
  return ctx;
}
