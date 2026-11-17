import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Heading from '../components/Heading';
import Card from '../components/Card';
import MenuCard from '../components/MenuCard';
import { useApp } from '../context/AppContext';

const MENU = [
  { route: 'Counter', icon: '🔢', title: 'Lab 1: Counter', subtitle: 'useState basics' },
  { route: 'Timer', icon: '⏱️', title: 'Lab 2: Timer', subtitle: 'useEffect and cleanup' },
  { route: 'Todo', icon: '✅', title: 'Lab 3: To-Do List', subtitle: 'Lists and input' },
  { route: 'Layout', icon: '🧱', title: 'Lab 4: Flexbox', subtitle: 'Responsive layout' },
  { route: 'Settings', icon: '⚙️', title: 'Settings', subtitle: 'Theme and profile' },
];

export default function HomeScreen({ navigation }) {
  const { userName, isDark } = useApp();

  return (
    <ScreenContainer>
      <Card>
        <Heading kind="title">Hello, {userName}! 👋</Heading>
        <Heading kind="muted">
          Welcome to your lab compilation. Current theme:{' '}
          {isDark ? 'Dark 🌙' : 'Light ☀️'}
        </Heading>
      </Card>

      <Heading kind="section" style={styles.sectionGap}>
        Activities
      </Heading>

      <View style={styles.grid}>
        {MENU.map((item) => (
          <MenuCard
            key={item.route}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => navigation.navigate(item.route)}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionGap: { marginTop: 4, marginLeft: 6 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    margin: -6,
  },
});
