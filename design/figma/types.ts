// Extracted from design/figma/App.tsx (types only, no runtime code)
export type AppStep = 'pricing' | 'payment' | 'charging' | 'receipt';

export interface ChargingData {
  timeElapsed: number;
  energyDelivered: number;
  chargingSpeed: number;
  runningCost: number;
}

export interface SessionData {
  stationId: string;
  stationName: string;
  stationStatus: 'available' | 'busy' | 'maintenance';
  location: string;
  connector: string;
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  totalEnergy: number;
  totalDuration: number;
  totalCost: number;
  pricePerKwh: number;
  sessionFee: number;
}
