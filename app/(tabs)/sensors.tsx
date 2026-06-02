import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMission } from '../../context/MissionContext';

export default function SensorsScreen() {
  const mission = useMission() || {};
  const isDarkMode = mission.isDarkMode ?? true;
  
  const themeBg = isDarkMode ? '#050A18' : '#F5F6FA';
  const themeCard = isDarkMode ? '#111827' : '#FFFFFF';
  const themeText = isDarkMode ? '#FFFFFF' : '#1F2937';

  const [temp, setTemp] = useState(42);
  useEffect(() => {
    const interval = setInterval(() => setTemp(Math.floor(Math.random() * (90 - 20) + 20)), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeBg }]}>
      <Text style={[styles.title, { color: themeText }]}>Sensores Ambientais</Text>
      
      <View style={[styles.card, { backgroundColor: themeCard }]}>
        <Ionicons name="thermometer" size={32} color="#EF4444" style={{marginBottom: 12}}/>
        <Text style={{ color: themeText, fontSize: 18, marginBottom: 10 }}>Temperatura Interna: {temp}°C</Text>
        <Text style={{ color: themeText, fontSize: 18, marginBottom: 10 }}>Radiação Externa: 1.2 mSv/h</Text>
        <Text style={{ color: themeText, fontSize: 18, marginBottom: 10 }}>Pressão da Cabine: 101.3 kPa</Text>
        <Text style={{ color: themeText, fontSize: 18 }}>Umidade Relativa: 35%</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  card: { padding: 20, borderRadius: 12, elevation: 2 }
});