import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadConfig, saveConfig, loadAlerts, saveAlerts } from '../utils/storage';

// Tipagens básicas
export interface Thresholds {
  temp: number;
  battery: number;
  signal: number;
}

export interface MissionConfig {
  name: string;
  operator: string;
  thresholds: Thresholds;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  level: 'critical' | 'warning';
  acknowledged: boolean;
  timestamp: string;
}

interface MissionContextData {
  config: MissionConfig | null;
  setConfig: (config: MissionConfig) => void;
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (id: string) => void;
  clearAlerts: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const MissionContext = createContext<MissionContextData | {}>(({}));

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = useState<MissionConfig | null>(null);
  const [alerts, setAlertsState] = useState<Alert[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Carrega os dados do AsyncStorage ao abrir o app
  useEffect(() => {
    async function fetchInitialData() {
      const savedConfig = await loadConfig();
      const savedAlerts = await loadAlerts();
      if (savedConfig) setConfigState(savedConfig);
      if (savedAlerts) setAlertsState(savedAlerts);
    }
    fetchInitialData();
  }, []);

  const setConfig = async (newConfig: MissionConfig) => {
    setConfigState(newConfig);
    await saveConfig(newConfig);
  };

  const addAlert = async (alert: Alert) => {
    const newAlerts = [alert, ...alerts];
    setAlertsState(newAlerts);
    await saveAlerts(newAlerts);
  };

  const acknowledgeAlert = async (id: string) => {
    const updated = alerts.map((a: Alert) => a.id === id ? { ...a, acknowledged: true } : a);
    setAlertsState(updated);
    await saveAlerts(updated);
  };

  const clearAlerts = async () => {
    const filtered = alerts.filter((a: Alert) => !a.acknowledged);
    setAlertsState(filtered);
    await saveAlerts(filtered);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <MissionContext.Provider value={{
      config, setConfig, alerts, addAlert, acknowledgeAlert, clearAlerts, isDarkMode, toggleTheme
    }}>
      {children}
    </MissionContext.Provider>
  );
}

export const useMission = () => useContext(MissionContext) as MissionContextData;