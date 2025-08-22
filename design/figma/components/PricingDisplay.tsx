import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Euro, Zap, Clock, AlertCircle, Info, MapPin, CheckCircle2, QrCode } from 'lucide-react';
import type { SessionData } from '../types';

interface PricingDisplayProps {
  sessionData: SessionData;
  onContinue: () => void;
}

export function PricingDisplay({ sessionData, onContinue }: PricingDisplayProps) {
  const preAuthAmount = 25.00;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'green';
      case 'busy': return 'orange';
      case 'maintenance': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Station Information Card */}
      <Card className="bg-white rounded-2xl shadow-xl border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <QrCode className="size-5 text-blue-500" />
              Station Connected
            </CardTitle>
            <CheckCircle2 className="size-5 text-green-500" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Station Details */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900">{sessionData.stationName}</p>
                  <Badge 
                    variant="outline" 
                    className={`border-${getStatusColor(sessionData.stationStatus)}-500 text-${getStatusColor(sessionData.stationStatus)}-700`}
                  >
                    {getStatusText(sessionData.stationStatus)}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm">{sessionData.stationId}</p>
                <Badge variant="secondary" className="mt-1">
                  {sessionData.connector}
                </Badge>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-gray-600 text-sm">{sessionData.location}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Information Card */}
      <Card className="bg-white rounded-2xl shadow-xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Euro className="size-5 text-green-500" />
            Pricing Information
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Transparent pricing as required by EU AFIR regulations
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Main Pricing */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                €{sessionData.pricePerKwh.toFixed(2)}
              </div>
              <p className="text-gray-700 font-medium">per kWh</p>
              <p className="text-gray-600 text-sm mt-1">Energy consumption rate</p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <Info className="size-4 text-blue-500" />
              Complete Price Breakdown
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-blue-500" />
                  <span className="font-medium">Energy Rate</span>
                </div>
                <span className="font-medium">€{sessionData.pricePerKwh.toFixed(2)} / kWh</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-orange-500" />
                  <span className="font-medium">Session Fee</span>
                </div>
                <span className="font-medium">€{sessionData.sessionFee.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <span className="font-medium text-blue-900">Pre-authorization</span>
                    <p className="text-blue-700 text-sm">Temporary hold on your card</p>
                  </div>
                  <span className="font-bold text-blue-900">€{preAuthAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Estimation Examples */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Cost Examples</h4>
            <div className="space-y-2 text-sm">
              {[
                { energy: 10, time: '~20 min' },
                { energy: 25, time: '~45 min' },
                { energy: 50, time: '~1.5 hrs' }
              ].map(example => {
                const estimatedCost = (example.energy * sessionData.pricePerKwh) + sessionData.sessionFee;
                return (
                  <div key={example.energy} className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {example.energy} kWh ({example.time})
                    </span>
                    <span className="font-medium">€{estimatedCost.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-amber-800">
                <p className="font-medium mb-1">Payment Information</p>
                <ul className="text-sm space-y-1">
                  <li>• You'll only pay for energy actually consumed</li>
                  <li>• Pre-authorization will be released after charging</li>
                  <li>• Final cost calculated when session ends</li>
                  <li>• Digital receipt provided immediately</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AFIR Compliance Badge */}
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="border-green-500 text-green-700">
              <span className="inline-flex items-center gap-1"><span className="text-green-600">EU</span> AFIR Compliant</span>
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-700">
              <span className="inline-flex items-center gap-1"><span className="inline-block w-2.5 h-3 rounded-[2px] bg-blue-600" /> Secure Payment</span>
            </Badge>
          </div>

          {/* Action Button */}
          <Button 
            onClick={onContinue}
            size="lg"
            className="bg-gray-900 hover:bg-gray-900/90 text-white rounded-xl w-full h-14 text-base"
          >
            Accept Pricing & Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}