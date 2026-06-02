import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useMission } from '../context/MissionContext';
import { Ionicons } from '@expo/vector-icons';

export default function MissionConfigScreen() {
  const { config, setConfig, isDarkMode, toggleTheme } = useMission();

  // Estados dos inputs (já puxando os dados salvos se existirem)
  const [name, setName] = useState(config?.name || '');
  const [operator, setOperator] = useState(config?.operator || '');
  const [temp, setTemp] = useState(config?.thresholds.temp.toString() || '80');
  const [battery, setBattery] = useState(config?.thresholds.battery.toString() || '20');

  const themeBg = isDarkMode ? '#050A18' : '#F5F6FA';
  const themeCard = isDarkMode ? '#111827' : '#FFFFFF';
  const themeText = isDarkMode ? '#FFFFFF' : '#1F2937';

  const handleSave = () => {
    // Validação básica
    if (!name || !operator) {
      Alert.alert('Atenção', 'Nome da missão e operador são obrigatórios.');
      return;
    }

    // Salva globalmente e no Storage
    setConfig({
      name,
      operator,
      thresholds: {
        temp: Number(temp),
        battery: Number(battery),
        signal: -90 // Padrão
      }
    });

    Alert.alert('Sucesso', 'Configurações de missão atualizadas!');
    router.back();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeBg }]}>
      
      {/* Botão de Voltar para melhorar a UX */}
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color={themeText} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: themeText }]}>Painel de Controle</Text>

      <View style={[styles.card, { backgroundColor: themeCard }]}>
        <Text style={[styles.label, { color: themeText }]}>Identificação da Missão *</Text>
        <TextInput 
          style={[styles.input, { color: themeText, borderColor: '#3A5C78' }]} 
          value={name} 
          onChangeText={setName} 
          placeholder="Ex: FIAP-SAT-01" 
          placeholderTextColor="#6B7280" 
        />

        <Text style={[styles.label, { color: themeText }]}>Operador Responsável *</Text>
        <TextInput 
          style={[styles.input, { color: themeText, borderColor: '#3A5C78' }]} 
          value={operator} 
          onChangeText={setOperator} 
          placeholder="Seu nome completo" 
          placeholderTextColor="#6B7280" 
        />

        <Text style={[styles.label, { color: themeText }]}>Limiar: Temperatura Crítica (°C)</Text>
        <TextInput 
          style={[styles.input, { color: themeText, borderColor: '#3A5C78' }]} 
          value={temp} 
          onChangeText={setTemp} 
          keyboardType="numeric" 
        />

        <Text style={[styles.label, { color: themeText }]}>Limiar: Bateria Crítica (%)</Text>
        <TextInput 
          style={[styles.input, { color: themeText, borderColor: '#3A5C78' }]} 
          value={battery} 
          onChangeText={setBattery} 
          keyboardType="numeric" 
        />
      </View>

      <TouchableOpacity style={styles.themeBtn} onPress={toggleTheme}>
        <Text style={styles.themeBtnText}>
          {isDarkMode ? '🌞 Mudar para Tema Claro' : '🌙 Mudar para Tema Escuro'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Salvar Configuração</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  backButton: {
    marginTop: 50,
    marginBottom: 10,
    padding: 5,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 16, borderRadius: 12, elevation: 2 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, marginTop: 12 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
  themeBtn: { marginTop: 24, padding: 16, backgroundColor: '#3A5C78', borderRadius: 8, alignItems: 'center' },
  themeBtnText: { color: '#FFF', fontWeight: 'bold' },
  saveBtn: { marginTop: 12, padding: 16, backgroundColor: '#10B981', borderRadius: 8, alignItems: 'center', marginBottom: 40 },
  saveBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});