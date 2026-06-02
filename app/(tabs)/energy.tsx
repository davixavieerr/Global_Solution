import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMission } from '../../context/MissionContext';

export default function EnergyScreen() {
  const mission = useMission() || {};
  const isDarkMode = mission.isDarkMode ?? true;
  
  const themeBg = isDarkMode ? '#050A18' : '#F5F6FA';
  const themeCard = isDarkMode ? '#111827' : '#FFFFFF';
  const themeText = isDarkMode ? '#FFFFFF' : '#1F2937';

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeBg }]}>
      <Text style={[styles.title, { color: themeText }]}>Sistema de Energia</Text>
      
      <View style={[styles.card, { backgroundColor: themeCard }]}>
        <Ionicons name="battery-charging" size={32} color="#10B981" style={{marginBottom: 12}}/>
        <Text style={{ color: themeText, fontSize: 18, marginBottom: 10 }}>Bateria Principal: 78%</Text>
        <Text style={{ color: themeText, fontSize: 18, marginBottom: 10 }}>Geração Solar: 820 W</Text>
        <Text style={{ color: themeText, fontSize: 18, marginBottom: 10 }}>Consumo Atual: 610 W</Text>
        <Text style={{ color: '#10B981', fontSize: 16, fontWeight: 'bold' }}>Status: Carregando (+210 W)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  card: { padding: 20, borderRadius: 12, elevation: 2 }
});