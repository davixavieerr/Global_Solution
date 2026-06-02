import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMission } from '../../context/MissionContext';

export default function CommunicationScreen() {
  const mission = useMission() || {};
  const isDarkMode = mission.isDarkMode ?? true;
  
  const themeBg = isDarkMode ? '#050A18' : '#F5F6FA';
  const themeCard = isDarkMode ? '#111827' : '#FFFFFF';
  const themeText = isDarkMode ? '#FFFFFF' : '#1F2937';

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeBg }]}>
      <Text style={[styles.title, { color: themeText }]}>Link de Telemetria</Text>
      
      <View style={[styles.card, { backgroundColor: themeCard }]}>
        <Ionicons name="wifi" size={32} color="#3B82F6" style={{marginBottom: 12}}/>
        <Text style={{ color: themeText, fontSize: 18, marginBottom: 10 }}>Força do Sinal: -65 dBm</Text>
        <Text style={{ color: themeText, fontSize: 18, marginBottom: 10 }}>Latência (Ping): 340 ms</Text>
        <Text style={{ color: themeText, fontSize: 18, marginBottom: 10 }}>Taxa de Dados: 1200 Kbps</Text>
        <Text style={{ color: themeText, fontSize: 18 }}>Perda de Pacotes: 0.4%</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  card: { padding: 20, borderRadius: 12, elevation: 2 }
});