import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert as RNAlert } from 'react-native';
import { useMission } from '../../context/MissionContext';
import { Ionicons } from '@expo/vector-icons';

export default function AlertsScreen() {
  const { alerts, clearAlerts, acknowledgeAlert, isDarkMode } = useMission();

  const themeBg = isDarkMode ? '#050A18' : '#F5F6FA';
  const themeCard = isDarkMode ? '#111827' : '#FFFFFF';
  const themeText = isDarkMode ? '#FFFFFF' : '#1F2937';

  const handleClear = () => {
    RNAlert.alert('Limpar Histórico', 'Deseja apagar todos os alertas reconhecidos?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar', onPress: clearAlerts }
    ]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeBg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeText }]}>Central de Alertas</Text>
        <TouchableOpacity onPress={handleClear}>
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {alerts.length === 0 ? (
        <Text style={{ color: themeText, textAlign: 'center', marginTop: 50 }}>
          Sistemas estáveis. Nenhum alerta registrado.
        </Text>
      ) : (
        alerts.map(alert => (
          <View key={alert.id} style={[styles.card, { backgroundColor: themeCard, opacity: alert.acknowledged ? 0.6 : 1 }]}>
            <View style={styles.cardHeader}>
              <Ionicons 
                name="warning" 
                size={20} 
                color={alert.level === 'critical' ? '#EF4444' : '#F59E0B'} 
              />
              <Text style={[styles.cardTitle, { color: themeText }]}>{alert.title}</Text>
            </View>
            <Text style={{ color: themeText, marginTop: 8 }}>{alert.message}</Text>
            <Text style={{ color: '#6B7280', fontSize: 12, marginTop: 8 }}>{alert.timestamp}</Text>

            {!alert.acknowledged && (
              <TouchableOpacity style={styles.ackBtn} onPress={() => acknowledgeAlert(alert.id)}>
                <Text style={styles.ackBtnText}>Reconhecer Alerta</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center', marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold' },
  card: { padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  ackBtn: { marginTop: 12, backgroundColor: '#3B82F6', padding: 10, borderRadius: 8, alignItems: 'center' },
  ackBtnText: { color: '#FFF', fontWeight: 'bold' }
});