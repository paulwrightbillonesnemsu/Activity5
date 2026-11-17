# Lab Compilation App

A multi-screen React Native (Expo) app that serves as the master compilation for all lab activities.

## Run it

```bash
npm install
npx expo start
```

Then press `a` (Android), `i` (iOS), `w` (web), or scan the QR code with the **Expo Go** app.

> Built for Expo SDK 58. If your Expo Go app is a different SDK, run `npx expo install --fix` to align package versions.

## Requirements checklist

| Requirement | Where |
|---|---|
| Project setup (Expo) | `package.json`, `app.json`, `App.js` |
| Multi-screen navigation + Home Dashboard menu | `App.js` (React Navigation stack), `src/screens/HomeScreen.js` |
| Reusable components | `src/components/` (`AppButton`, `Card`, `MenuCard`, `Heading`, `ScreenContainer`) |
| Hooks (`useState`, `useEffect`) | `CounterScreen`, `TimerScreen`, `TodoScreen`, `LayoutScreen` |
| Responsive Flexbox layout | `HomeScreen` (wrapping grid), `ScreenContainer` (ScrollView + max width), `LayoutScreen` (playground) |
| Global state (Context API) | `src/context/AppContext.js` - dark/light theme + profile name |
| Settings screen updates Home instantly | `SettingsScreen` toggles theme and name; `HomeScreen` and all screens react immediately |

## Adding future labs

1. Create `src/screens/MyLabScreen.js` (wrap content in `<ScreenContainer>`).
2. Register it in `App.js` with a `<Stack.Screen>`.
3. Add an entry to the `MENU` array in `src/screens/HomeScreen.js`.

## Structure

```
App.js
src/
  context/AppContext.js     global state (theme + user name, persisted)
  theme/themes.js           light and dark palettes
  components/               reusable UI pieces
  screens/                  Home, Settings, and lab screens
```
