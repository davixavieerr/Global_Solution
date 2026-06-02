import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMission } from '../../context/MissionContext';

export default function TabsLayout() {
  const mission = useMission() || {};
  const isDarkMode = mission.isDarkMode ?? true;
  
  const themeBg = isDarkMode ? '#050A18' : '#F5F6FA';
  const themeActive = '#3B82F6';

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: themeBg, borderTopColor: '#1E3A5F' },
      tabBarActiveTintColor: themeActive,
      tabBarInactiveTintColor: '#6B7280'
    }}>
      <Tabs.Screen name="index" options={{ title: 'Visão', tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color} /> }} />
      <Tabs.Screen name="sensors" options={{ title: 'Sensores', tabBarIcon: ({ color }) => <Ionicons name="thermometer" size={22} color={color} /> }} />
      <Tabs.Screen name="energy" options={{ title: 'Energia', tabBarIcon: ({ color }) => <Ionicons name="battery-charging" size={22} color={color} /> }} />
      <Tabs.Screen name="communication" options={{ title: 'Comms', tabBarIcon: ({ color }) => <Ionicons name="wifi" size={22} color={color} /> }} />
      <Tabs.Screen name="alerts" options={{ title: 'Alertas', tabBarIcon: ({ color }) => <Ionicons name="warning" size={22} color={color} /> }} />
    </Tabs>
  );
}