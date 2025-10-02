// Mock IoT Sensor Service
// Generates realistic sensor data for development and testing

export interface SensorReading {
  value: number;
  unit: string;
  timestamp: string;
  quality: 'good' | 'warning' | 'error';
}

export interface SensorInfo {
  sensorId: string;
  type: 'temperature' | 'pressure' | 'humidity' | 'gas' | 'flow' | 'level' | 'vibration' | 'power';
  name: string;
  location: string;
  unit: string;
  currentValue: number;
  status: 'online' | 'offline' | 'warning';
  signalStrength: number; // 0-100
  batteryLevel?: number; // 0-100 for battery-powered sensors
  calibrationDate: string;
  lastReading: string;
  threshold?: {
    min?: number;
    max?: number;
    warning?: number;
    critical?: number;
  };
  visualType?: 'gauge' | 'dial' | 'bar' | 'number' | 'chart';
  history?: SensorReading[];
}

class MockSensorService {
  private sensors: Map<string, SensorInfo> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  
  constructor() {
    this.initializeSensors();
  }

  private initializeSensors() {
    // Temperature Sensors
    this.addSensor({
      sensorId: 'TEMP-001',
      type: 'temperature',
      name: 'Cold Storage Unit 1',
      location: 'Warehouse A - Section 3',
      unit: '°C',
      currentValue: -18.5,
      status: 'online',
      signalStrength: 92,
      calibrationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      lastReading: new Date().toISOString(),
      threshold: { min: -25, max: -15, warning: -16, critical: -14 },
      visualType: 'gauge',
      history: this.generateHistory('temperature', -18.5, 24)
    });

    this.addSensor({
      sensorId: 'TEMP-002',
      type: 'temperature',
      name: 'Server Room',
      location: 'Data Center - Floor 2',
      unit: '°C',
      currentValue: 21.2,
      status: 'online',
      signalStrength: 88,
      calibrationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      lastReading: new Date().toISOString(),
      threshold: { min: 18, max: 25, warning: 24, critical: 26 },
      visualType: 'gauge',
      history: this.generateHistory('temperature', 21, 24)
    });

    // Pressure Sensors
    this.addSensor({
      sensorId: 'PRES-001',
      type: 'pressure',
      name: 'Hydraulic System Main',
      location: 'Machine Shop - Press 1',
      unit: 'kPa',
      currentValue: 3450,
      status: 'online',
      signalStrength: 95,
      calibrationDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      lastReading: new Date().toISOString(),
      threshold: { min: 3000, max: 4000, warning: 3800, critical: 3900 },
      visualType: 'dial',
      history: this.generateHistory('pressure', 3450, 24)
    });

    // Humidity Sensors
    this.addSensor({
      sensorId: 'HUMID-001',
      type: 'humidity',
      name: 'Clean Room A',
      location: 'Production Floor - Zone 1',
      unit: '%',
      currentValue: 45,
      status: 'online',
      signalStrength: 78,
      batteryLevel: 67,
      calibrationDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      lastReading: new Date().toISOString(),
      threshold: { min: 30, max: 60, warning: 55, critical: 58 },
      visualType: 'bar',
      history: this.generateHistory('humidity', 45, 24)
    });

    // Gas Detection Sensors
    this.addSensor({
      sensorId: 'GAS-001',
      type: 'gas',
      name: 'H2S Monitor',
      location: 'Chemical Storage - Area B',
      unit: 'ppm',
      currentValue: 2.5,
      status: 'online',
      signalStrength: 90,
      calibrationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      lastReading: new Date().toISOString(),
      threshold: { min: 0, max: 10, warning: 5, critical: 8 },
      visualType: 'bar',
      history: this.generateHistory('gas', 2.5, 24)
    });

    this.addSensor({
      sensorId: 'GAS-002',
      type: 'gas',
      name: 'CO2 Level',
      location: 'Office Building - Floor 3',
      unit: 'ppm',
      currentValue: 420,
      status: 'online',
      signalStrength: 85,
      calibrationDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      lastReading: new Date().toISOString(),
      threshold: { min: 400, max: 1000, warning: 800, critical: 900 },
      visualType: 'chart',
      history: this.generateHistory('gas', 420, 24)
    });

    // Flow Sensor
    this.addSensor({
      sensorId: 'FLOW-001',
      type: 'flow',
      name: 'Cooling Water Flow',
      location: 'Cooling Tower - Unit 1',
      unit: 'L/min',
      currentValue: 250,
      status: 'online',
      signalStrength: 82,
      calibrationDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      lastReading: new Date().toISOString(),
      threshold: { min: 200, max: 300, warning: 220, critical: 210 },
      visualType: 'gauge',
      history: this.generateHistory('flow', 250, 24)
    });

    // Power Sensor
    this.addSensor({
      sensorId: 'POWER-001',
      type: 'power',
      name: 'Main Building Consumption',
      location: 'Electrical Room - Panel A',
      unit: 'kW',
      currentValue: 145.7,
      status: 'online',
      signalStrength: 99,
      calibrationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      lastReading: new Date().toISOString(),
      threshold: { max: 200, warning: 180, critical: 195 },
      visualType: 'chart',
      history: this.generateHistory('power', 145, 24)
    });

    // Start simulating real-time updates
    this.startSimulation();
  }

  private addSensor(sensor: SensorInfo) {
    this.sensors.set(sensor.sensorId, sensor);
  }

  private generateHistory(type: string, baseValue: number, hours: number): SensorReading[] {
    const history: SensorReading[] = [];
    const now = Date.now();
    
    for (let i = hours; i >= 0; i--) {
      const timestamp = new Date(now - i * 60 * 60 * 1000);
      let variation = 0;
      
      switch (type) {
        case 'temperature':
          variation = (Math.random() - 0.5) * 2; // ±1°C
          break;
        case 'pressure':
          variation = (Math.random() - 0.5) * 100; // ±50 kPa
          break;
        case 'humidity':
          variation = (Math.random() - 0.5) * 10; // ±5%
          break;
        case 'gas':
          variation = (Math.random() - 0.5) * (baseValue * 0.2); // ±10% of base
          break;
        case 'flow':
          variation = (Math.random() - 0.5) * 20; // ±10 L/min
          break;
        case 'power':
          variation = Math.random() * 20 - 5; // +15/-5 kW (more increases)
          break;
      }
      
      const value = baseValue + variation;
      const sensor = this.sensors.get(type.toUpperCase() + '-001');
      const quality = this.getQuality(value, sensor?.threshold);
      
      history.push({
        value: Math.round(value * 10) / 10,
        unit: sensor?.unit || '',
        timestamp: timestamp.toISOString(),
        quality
      });
    }
    
    return history;
  }

  private getQuality(value: number, threshold?: SensorInfo['threshold']): 'good' | 'warning' | 'error' {
    if (!threshold) return 'good';
    
    if (threshold.critical && (
      (threshold.min !== undefined && value <= threshold.min) ||
      (threshold.critical !== undefined && value >= threshold.critical)
    )) {
      return 'error';
    }
    
    if (threshold.warning && (
      (threshold.min !== undefined && value <= threshold.min + (threshold.warning - threshold.min) * 0.1) ||
      (threshold.warning !== undefined && value >= threshold.warning)
    )) {
      return 'warning';
    }
    
    return 'good';
  }

  private startSimulation() {
    // Update sensor values every 5 seconds
    this.sensors.forEach((sensor) => {
      const interval = setInterval(() => {
        this.updateSensorValue(sensor.sensorId);
      }, 5000 + Math.random() * 2000); // 5-7 seconds
      
      this.intervals.set(sensor.sensorId, interval);
    });

    // Occasionally make a sensor go offline/online
    setInterval(() => {
      const sensorIds = Array.from(this.sensors.keys());
      const randomSensor = sensorIds[Math.floor(Math.random() * sensorIds.length)];
      const sensor = this.sensors.get(randomSensor);
      
      if (sensor && Math.random() > 0.95) { // 5% chance
        sensor.status = sensor.status === 'online' ? 'warning' : 'online';
        sensor.signalStrength = sensor.status === 'online' 
          ? 70 + Math.random() * 30 
          : 20 + Math.random() * 30;
      }
    }, 10000);
  }

  private updateSensorValue(sensorId: string) {
    const sensor = this.sensors.get(sensorId);
    if (!sensor || sensor.status === 'offline') return;

    let variation = 0;
    switch (sensor.type) {
      case 'temperature':
        variation = (Math.random() - 0.5) * 0.4; // ±0.2°C
        break;
      case 'pressure':
        variation = (Math.random() - 0.5) * 20; // ±10 kPa
        break;
      case 'humidity':
        variation = (Math.random() - 0.5) * 2; // ±1%
        break;
      case 'gas':
        variation = (Math.random() - 0.5) * (sensor.currentValue * 0.1); // ±5%
        break;
      case 'flow':
        variation = (Math.random() - 0.5) * 5; // ±2.5 L/min
        break;
      case 'power':
        // Power consumption has more realistic patterns
        const hour = new Date().getHours();
        const isBusinessHours = hour >= 8 && hour <= 18;
        variation = isBusinessHours 
          ? Math.random() * 10 - 2  // More consumption during day
          : Math.random() * -10;     // Less at night
        break;
      case 'vibration':
        variation = Math.random() * 0.5; // Only positive
        break;
    }

    sensor.currentValue = Math.round((sensor.currentValue + variation) * 10) / 10;
    sensor.lastReading = new Date().toISOString();
    
    // Update signal strength occasionally
    if (Math.random() > 0.8) {
      sensor.signalStrength = Math.min(100, Math.max(0, 
        sensor.signalStrength + (Math.random() - 0.5) * 10
      ));
    }

    // Update battery level for battery-powered sensors
    if (sensor.batteryLevel !== undefined && Math.random() > 0.95) {
      sensor.batteryLevel = Math.max(0, sensor.batteryLevel - Math.random() * 0.5);
    }

    // Add to history
    if (sensor.history) {
      const reading: SensorReading = {
        value: sensor.currentValue,
        unit: sensor.unit,
        timestamp: sensor.lastReading,
        quality: this.getQuality(sensor.currentValue, sensor.threshold)
      };
      
      sensor.history.push(reading);
      // Keep only last 24 hours
      if (sensor.history.length > 24 * 12) { // Assuming 12 readings per hour
        sensor.history.shift();
      }
    }
  }

  // Public API

  async getSensor(sensorId: string): Promise<SensorInfo | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
    
    const sensor = this.sensors.get(sensorId);
    return sensor || null;
  }

  async getCurrentReading(sensorId: string): Promise<SensorReading | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    const sensor = this.sensors.get(sensorId);
    if (!sensor) return null;

    // Occasionally simulate connection issues
    if (Math.random() > 0.98) {
      throw new Error('Sensor connection timeout');
    }

    return {
      value: sensor.currentValue,
      unit: sensor.unit,
      timestamp: sensor.lastReading,
      quality: this.getQuality(sensor.currentValue, sensor.threshold)
    };
  }

  async getAllSensors(): Promise<SensorInfo[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return Array.from(this.sensors.values());
  }

  async getSensorHistory(sensorId: string, hours: number = 24): Promise<SensorReading[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const sensor = this.sensors.get(sensorId);
    if (!sensor || !sensor.history) return [];
    
    const cutoff = Date.now() - hours * 60 * 60 * 1000;
    return sensor.history.filter(reading => 
      new Date(reading.timestamp).getTime() > cutoff
    );
  }

  async testSensorConnection(sensorId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const sensor = this.sensors.get(sensorId);
    return sensor ? sensor.status === 'online' : false;
  }

  // Cleanup
  stopSimulation() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
  }
}

export const mockSensorService = new MockSensorService();