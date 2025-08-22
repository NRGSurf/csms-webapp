import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { CheckCircle2, Receipt as ReceiptIcon, Mail, Download, RefreshCw, MapPin, Clock, Zap, Euro } from 'lucide-react';
import type { ChargingData, SessionData } from '../types';

interface ReceiptProps {
  sessionData: SessionData;
  chargingData: ChargingData;
  onNewSession: () => void;
}

export function Receipt({ sessionData, chargingData, onNewSession }: ReceiptProps) {
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleSendEmail = () => {
    // Simulate email sending
    setTimeout(() => {
      setEmailSent(true);
      setShowEmailForm(false);
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const transactionId = `TXN-${sessionData.sessionId}-${Date.now().toString().slice(-6)}`;

  return (
    <div className="space-y-4">
      {/* Success Header */}
      <Card className="shadow-lg bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6 text-center">
          <CheckCircle2 className="size-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 mb-2">Charging Complete!</h2>
          <p className="text-green-700">Your payment has been processed successfully</p>
          
          <div className="mt-4 p-4 bg-white/80 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-1">
              €{chargingData.runningCost.toFixed(2)}
            </div>
            <p className="text-green-700 text-sm">Final Amount Charged</p>
          </div>
        </CardContent>
      </Card>

      {/* Digital Receipt */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <ReceiptIcon className="size-5 text-blue-500" />
            Digital Receipt
          </CardTitle>
          <p className="text-gray-600 text-sm">Transaction completed on {new Date().toLocaleDateString()}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Session Summary */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="size-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Duration</span>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  {formatTime(chargingData.timeElapsed)}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="size-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Energy</span>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  {chargingData.energyDelivered.toFixed(1)} kWh
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Euro className="size-4 text-blue-600" />
                <span className="text-sm text-blue-600">Average Charging Speed</span>
              </div>
              <p className="text-xl font-bold text-blue-900">
                {(chargingData.energyDelivered / (chargingData.timeElapsed / 3600)).toFixed(1)} kW
              </p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Cost Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">Energy Consumed</span>
                  <p className="text-sm text-gray-600">{chargingData.energyDelivered.toFixed(1)} kWh × €{sessionData.pricePerKwh.toFixed(2)}/kWh</p>
                </div>
                <span className="font-medium">€{(chargingData.energyDelivered * sessionData.pricePerKwh).toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">Session Fee</span>
                  <p className="text-sm text-gray-600">One-time activation fee</p>
                </div>
                <span className="font-medium">€{sessionData.sessionFee.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="font-bold text-blue-900">Total Amount Charged</span>
                  <span className="font-bold text-xl text-blue-900">€{chargingData.runningCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Session Details</h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="size-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-600">{sessionData.location}</p>
                  <p className="text-gray-600 text-xs">Station ID: {sessionData.stationId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Session Start</p>
                  <p className="font-medium text-gray-900">{sessionData.startTime.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Session End</p>
                  <p className="font-medium text-gray-900">{sessionData.endTime?.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Session ID</p>
                  <p className="font-mono font-medium text-gray-900">{sessionData.sessionId}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Transaction ID</p>
                  <p className="font-mono font-medium text-gray-900">{transactionId}</p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Connector Type</p>
                <p className="font-medium text-gray-900">{sessionData.connector}</p>
              </div>
            </div>
          </div>

          {/* Compliance Information */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="border-green-500 text-green-700">
                🇪🇺 EU AFIR Compliant
              </Badge>
            </div>
            <p className="text-green-800 text-sm">
              This transaction complies with EU Alternative Fuels Infrastructure Regulation (AFIR) requirements for transparent pricing and ad-hoc payments.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Email Receipt */}
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          {!showEmailForm && !emailSent ? (
            <div className="text-center space-y-4">
              <Mail className="size-12 text-gray-400 mx-auto" />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Email Receipt</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get a copy of this receipt sent to your email
                </p>
              </div>
              <Button
                onClick={() => setShowEmailForm(true)}
                variant="outline"
                className="w-full h-12"
              >
                <Mail className="size-4 mr-2" />
                Send Receipt via Email
              </Button>
            </div>
          ) : emailSent ? (
            <div className="text-center space-y-4">
              <CheckCircle2 className="size-12 text-green-500 mx-auto" />
              <div>
                <h3 className="font-medium text-green-900 mb-2">Receipt Sent!</h3>
                <p className="text-green-700 text-sm">
                  Your receipt has been sent to {emailAddress}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="font-medium">Email Address</Label>
                <p className="text-xs text-gray-500 mb-2">
                  We'll only use this to send your receipt. No marketing emails.
                </p>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="h-12"
              />
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setShowEmailForm(false)}
                  variant="outline"
                  className="h-12"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendEmail}
                  disabled={!emailAddress.includes('@')}
                  className="h-12"
                >
                  <Mail className="size-4 mr-2" />
                  Send Receipt
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onNewSession}
          size="lg"
          className="w-full h-14 text-base"
        >
          <RefreshCw className="size-5 mr-2" />
          Start New Charging Session
        </Button>

        <div className="text-center">
          <p className="text-xs text-gray-500 mb-3">
            Thank you for using our EV charging network!
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <button className="hover:text-gray-600">Support</button>
            <button className="hover:text-gray-600">Terms</button>
            <button className="hover:text-gray-600">Privacy</button>
          </div>
        </div>
      </div>
    </div>
  );
}