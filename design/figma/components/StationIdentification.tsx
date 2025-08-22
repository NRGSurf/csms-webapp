import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Zap, QrCode, CheckCircle2 } from 'lucide-react';
import { SessionData } from '../App';

interface StationIdentificationProps {
  sessionData: SessionData;
  onContinue: () => void;
}

export function StationIdentification({ sessionData, onContinue }: StationIdentificationProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <QrCode className="size-5 text-blue-500" />
            Station Identified
          </CardTitle>
          <CheckCircle2 className="size-6 text-green-500" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* QR Code Simulation */}
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-3 flex items-center justify-center">
            <QrCode className="size-8 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600">QR Code Scanned Successfully</p>
        </div>

        {/* Station Details */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Zap className="size-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Charging Station</p>
              <p className="text-gray-600">{sessionData.stationId}</p>
              <Badge variant="secondary" className="mt-1">
                {sessionData.connector}
              </Badge>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Location</p>
              <p className="text-gray-600">{sessionData.location}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-blue-500 rounded-full">
                <CheckCircle2 className="size-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900">Station Available</p>
                <p className="text-blue-700 text-sm">Ready to start charging session</p>
              </div>
            </div>
          </div>
        </div>

        {/* Session Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Session Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Session ID</p>
              <p className="font-mono text-gray-900">{sessionData.sessionId}</p>
            </div>
            <div>
              <p className="text-gray-600">Started</p>
              <p className="text-gray-900">{sessionData.startTime.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={onContinue}
          size="lg"
          className="w-full h-14 text-base"
        >
          Continue to Pricing
        </Button>

        {/* Info Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-amber-800 text-sm">
            ℹ️ No registration required. You can pay for this charging session without creating an account.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}