import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Zap, Clock, Euro, Activity, StopCircle, Pause, AlertTriangle } from 'lucide-react';
import type { ChargingData, SessionData } from '../types';

interface ChargingSessionProps {
  chargingData: ChargingData;
  sessionData: SessionData;
  isCharging: boolean;
  onStopCharging: () => void;
}

export function ChargingSession({ chargingData, sessionData, isCharging, onStopCharging }: ChargingSessionProps) {
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getChargingStatus = () => {
    if (!isCharging) return { status: 'Paused', color: 'amber', icon: Pause };
    if (chargingData.chargingSpeed > 40) return { status: 'Fast Charging', color: 'green', icon: Zap };
    if (chargingData.chargingSpeed > 20) return { status: 'Charging', color: 'blue', icon: Activity };
    return { status: 'Slow Charging', color: 'orange', icon: AlertTriangle };
  };

  const chargingStatus = getChargingStatus();
  const StatusIcon = chargingStatus.icon;

  // Simulate battery percentage for display purposes
  const estimatedBatteryPercent = Math.min(95, 20 + (chargingData.energyDelivered * 2));

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <StatusIcon className={`size-5 text-${chargingStatus.color}-500`} />
              {chargingStatus.status}
            </CardTitle>
            <Badge 
              variant="outline" 
              className={`border-${chargingStatus.color}-500 text-${chargingStatus.color}-700`}
            >
              Live Session
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Battery Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Estimated Battery Level</span>
              <span className="font-bold text-2xl text-green-600">{Math.round(estimatedBatteryPercent)}%</span>
            </div>
            <Progress value={estimatedBatteryPercent} className="h-3" />
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Clock className="size-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">
                {formatTime(chargingData.timeElapsed)}
              </div>
              <p className="text-blue-700 text-sm">Duration</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Zap className="size-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">
                {chargingData.energyDelivered.toFixed(1)}
              </div>
              <p className="text-green-700 text-sm">kWh Delivered</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <Activity className="size-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">
                {chargingData.chargingSpeed.toFixed(0)}
              </div>
              <p className="text-purple-700 text-sm">kW Current</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <Euro className="size-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">
                €{chargingData.runningCost.toFixed(2)}
              </div>
              <p className="text-orange-700 text-sm">Current Cost</p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Cost Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Energy ({chargingData.energyDelivered.toFixed(1)} kWh × €{sessionData.pricePerKwh.toFixed(2)})</span>
                <span className="font-medium">€{(chargingData.energyDelivered * sessionData.pricePerKwh).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Session Fee</span>
                <span className="font-medium">€{sessionData.sessionFee.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>€{chargingData.runningCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Control */}
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          {!showStopConfirm ? (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Charging in progress. You can stop anytime or let it complete automatically.
                </p>
                
                <Button 
                  onClick={() => setShowStopConfirm(true)}
                  variant="destructive"
                  size="lg"
                  className="w-full h-14 text-base"
                >
                  <StopCircle className="size-5 mr-2" />
                  Stop Charging
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-sm text-center">
                  💡 Session will also stop automatically when your vehicle is fully charged or if you disconnect the cable.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <AlertTriangle className="size-12 text-amber-500 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-2">Stop Charging Session?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Are you sure you want to end this charging session? You'll be charged for the energy consumed so far.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700">
                    Current charge: {chargingData.energyDelivered.toFixed(1)} kWh • 
                    Cost: €{chargingData.runningCost.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => setShowStopConfirm(false)}
                  variant="outline"
                  size="lg"
                  className="h-12"
                >
                  Continue Charging
                </Button>
                <Button 
                  onClick={onStopCharging}
                  variant="destructive"
                  size="lg"
                  className="h-12"
                >
                  Stop & Pay
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Session Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Station ID</p>
                <p className="font-mono text-gray-900">{sessionData.stationId}</p>
              </div>
              <div>
                <p className="text-gray-600">Session ID</p>
                <p className="font-mono text-gray-900">{sessionData.sessionId}</p>
              </div>
              <div>
                <p className="text-gray-600">Started</p>
                <p className="text-gray-900">{sessionData.startTime.toLocaleTimeString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Connector</p>
                <p className="text-gray-900">{sessionData.connector}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}