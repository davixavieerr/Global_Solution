import AsyncStorage from '@react-native-async-storage/async-storage';
import { MissionConfig, Alert } from '../context/MissionContext';

const KEYS = {
  CONFIG: '@space_config',
  ALERTS: '@space_alerts',
};

export async function saveConfig(config: MissionConfig) {
  try {
    await AsyncStorage.setItem(KEYS.CONFIG, JSON.stringify(config));
  } catch (error) {
    console.error("Erro ao salvar config", error);
  }
}

export async function loadConfig(): Promise<MissionConfig | null> {
  try {
    const data = await AsyncStorage.getItem(KEYS.CONFIG);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
}

export async function saveAlerts(alerts: Alert[]) {
  try {
    await AsyncStorage.setItem(KEYS.ALERTS, JSON.stringify(alerts));
  } catch (error) {
    console.error("Erro ao salvar alertas", error);
  }
}

export async function loadAlerts(): Promise<Alert[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.ALERTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}