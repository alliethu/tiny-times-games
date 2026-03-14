import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_CONFIG: {
  name: string;
  title: string;
  icon: IoniconsName;
  iconFocused: IoniconsName;
  color: string;
}[] = [
  {
    name: 'index',
    title: 'Home',
    icon: 'home-outline',
    iconFocused: 'home',
    color: Colors.primary,
  },
  {
    name: 'wordle',
    title: 'Wordle',
    icon: 'grid-outline',
    iconFocused: 'grid',
    color: Colors.wordle,
  },
  {
    name: 'spelling-bee',
    title: 'Bee',
    icon: 'flower-outline',
    iconFocused: 'flower',
    color: Colors.spellingBee,
  },
  {
    name: 'crossword',
    title: 'Cross',
    icon: 'apps-outline',
    iconFocused: 'apps',
    color: Colors.crossword,
  },
  {
    name: 'trivia',
    title: 'Trivia',
    icon: 'bulb-outline',
    iconFocused: 'bulb',
    color: Colors.trivia,
  },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.borderLight,
          height: 88,
          paddingBottom: 24,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? tab.iconFocused : tab.icon}
                size={size}
                color={focused ? tab.color : Colors.textLight}
              />
            ),
            tabBarActiveTintColor: tab.color,
          }}
        />
      ))}
    </Tabs>
  );
}
