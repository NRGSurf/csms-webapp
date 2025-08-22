import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { MapPin, Zap, Clock, Euro, Mail, CheckCircle2, AlertCircle, CreditCard, Smartphone } from 'lucide-react';
import { PricingDisplay } from './components/PricingDisplay';
import { PaymentForm } from './components/PaymentForm';
import { ChargingSession } from './components/ChargingSession';
import { Receipt } from './components/Receipt';
import AppIcon3 from './imports/AppIcon2';

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

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('pricing');
  const [chargingData, setChargingData] = useState<ChargingData>({
    timeElapsed: 0,
    energyDelivered: 0,
    chargingSpeed: 0,
    runningCost: 0
  });
  
  const [sessionData, setSessionData] = useState<SessionData>({
    stationId: 'EV-CHARGE-001',
    stationName: 'Munich Shopping Center',
    stationStatus: 'available',
    location: 'Shopping Center Parking, Munich',
    connector: 'CCS Type 2',
    sessionId: 'SES-' + Date.now(),
    startTime: new Date(),
    totalEnergy: 0,
    totalDuration: 0,
    totalCost: 0,
    pricePerKwh: 0.55,
    sessionFee: 1.50
  });

  const [paymentAuthorized, setPaymentAuthorized] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [language, setLanguage] = useState('en');

  // Simulate charging session data updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCharging) {
      interval = setInterval(() => {
        setChargingData(prev => {
          const newTimeElapsed = prev.timeElapsed + 1;
          const chargingSpeedVariation = 45 + Math.random() * 10; // 45-55 kW
          const newEnergyDelivered = prev.energyDelivered + (chargingSpeedVariation / 3600); // kWh per second
          const newRunningCost = newEnergyDelivered * sessionData.pricePerKwh + sessionData.sessionFee;
          
          return {
            timeElapsed: newTimeElapsed,
            energyDelivered: newEnergyDelivered,
            chargingSpeed: chargingSpeedVariation,
            runningCost: newRunningCost
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCharging, sessionData.pricePerKwh, sessionData.sessionFee]);

  const handleStartCharging = () => {
    setIsCharging(true);
    setCurrentStep('charging');
  };

  const handleStopCharging = () => {
    setIsCharging(false);
    setSessionData(prev => ({
      ...prev,
      endTime: new Date(),
      totalEnergy: chargingData.energyDelivered,
      totalDuration: chargingData.timeElapsed,
      totalCost: chargingData.runningCost
    }));
    setCurrentStep('receipt');
  };

  const handlePaymentAuthorized = () => {
    setPaymentAuthorized(true);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'pricing':
        return (
          <PricingDisplay 
            sessionData={sessionData}
            onContinue={() => setCurrentStep('payment')}
          />
        );
      case 'payment':
        return (
          <PaymentForm 
            sessionData={sessionData}
            onPaymentAuthorized={handlePaymentAuthorized}
            onContinue={handleStartCharging}
          />
        );
      case 'charging':
        return (
          <ChargingSession 
            chargingData={chargingData}
            sessionData={sessionData}
            isCharging={isCharging}
            onStopCharging={handleStopCharging}
          />
        );
      case 'receipt':
        return (
          <Receipt 
            sessionData={sessionData}
            chargingData={chargingData}
            onNewSession={() => {
              setCurrentStep('pricing');
              setChargingData({ timeElapsed: 0, energyDelivered: 0, chargingSpeed: 0, runningCost: 0 });
              setPaymentAuthorized(false);
              setIsCharging(false);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16">
              <AppIcon3 />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">NRG Charge Portal</h1>
          <p className="text-gray-600">AFIR Compliant • Secure • No Registration Required</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {(() => {
              const stepKeys: AppStep[] = ['pricing', 'payment', 'charging', 'receipt'];
              const currentIndex = stepKeys.indexOf(currentStep);
              
              return ['Pricing', 'Payment', 'Charging', 'Receipt'].map((step, index) => {
                const isActive = index === currentIndex;
                const isCompleted = index < currentIndex;
                
                return (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isActive ? 'bg-blue-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="size-4" /> : index + 1}
                    </div>
                    <span className="text-xs mt-1 text-gray-600">{step}</span>
                  </div>
                );
              });
            })()}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(() => {
                  const stepKeys: AppStep[] = ['pricing', 'payment', 'charging', 'receipt'];
                  return ((stepKeys.indexOf(currentStep) + 1) / 4) * 100;
                })()}%` 
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        {renderCurrentStep()}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 mb-2">
            🔒 Secure Payment • 🇪🇺 EU AFIR Compliant • 📱 Mobile Optimized
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'font-medium' : ''}>
              EN
            </button>
            <button onClick={() => setLanguage('de')} className={language === 'de' ? 'font-medium' : ''}>
              DE
            </button>
            <button onClick={() => setLanguage('fr')} className={language === 'fr' ? 'font-medium' : ''}>
              FR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;