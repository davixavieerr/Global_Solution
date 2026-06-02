import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useMission } from '../../context/MissionContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { config, alerts, isDarkMode } = useMission();
  
  const [telemetry, setTelemetry] = useState({
    temperature: 25,
    battery: 100,
    signal: -50
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        temperature: Math.floor(Math.random() * (90 - 20) + 20),
        battery: Math.max(0, telemetry.battery - Math.floor(Math.random() * 5)),
        signal: Math.floor(Math.random() * (-30 - -100) + -100)
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [telemetry]);

  const activeAlerts = alerts.filter(a => !a.acknowledged).length;
  const themeBg = isDarkMode ? '#050A18' : '#F5F6FA';
  const themeCard = isDarkMode ? '#111827' : '#FFFFFF';
  const themeText = isDarkMode ? '#FFFFFF' : '#1F2937';

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeBg }]}>
      <View style={[styles.header, { backgroundColor: themeCard }]}>
        <View>
          <Text style={styles.badge}>MISSÃO ATIVA</Text>
          <Text style={[styles.title, { color: themeText }]}>
            {config ? config.name : 'Nenhuma missão configurada'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/mission-config')}>
          <Ionicons name="settings-outline" size={24} color={themeText} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: themeText }]}>Telemetria ao Vivo</Text>
      
      <View style={styles.grid}>
        <View style={[styles.card, { backgroundColor: themeCard }]}>
          <Ionicons name="thermometer" size={24} color="#EF4444" />
          <Text style={[styles.cardLabel, { color: themeText }]}>Temperatura</Text>
          <Text style={[styles.cardValue, { color: themeText }]}>{telemetry.temperature} °C</Text>
        </View>

        <View style={[styles.card, { backgroundColor: themeCard }]}>
          <Ionicons name="battery-full" size={24} color="#10B981" />
          <Text style={[styles.cardLabel, { color: themeText }]}>Bateria</Text>
          <Text style={[styles.cardValue, { color: themeText }]}>{telemetry.battery} %</Text>
        </View>

        <View style={[styles.card, { backgroundColor: themeCard }]}>
          <Ionicons name="wifi" size={24} color="#3B82F6" />
          <Text style={[styles.cardLabel, { color: themeText }]}>Sinal</Text>
          <Text style={[styles.cardValue, { color: themeText }]}>{telemetry.signal} dBm</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 2, marginTop: 20 },
  badge: { color: '#3B82F6', fontWeight: 'bold', fontSize: 12, marginBottom: 4 },
  title: { fontSize: 20, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  card: { width: '31%', padding: 16, borderRadius: 12, alignItems: 'center', elevation: 2 },
  cardLabel: { fontSize: 12, marginTop: 8, opacity: 0.7 },
  cardValue: { fontSize: 18, fontWeight: 'bold', marginTop: 4 }
});