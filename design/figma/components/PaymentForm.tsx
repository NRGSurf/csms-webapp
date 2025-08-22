import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { CreditCard, Smartphone, Shield, CheckCircle2, Loader2 } from 'lucide-react';
import type { SessionData } from '../types';

interface PaymentFormProps {
  sessionData: SessionData;
  onPaymentAuthorized: () => void;
  onContinue: () => void;
}

export function PaymentForm({ sessionData, onPaymentAuthorized, onContinue }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCardPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsAuthorized(true);
      onPaymentAuthorized();
    }, 2000);
  };

  const handleWalletPayment = async () => {
    setIsProcessing(true);
    
    // Simulate wallet payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsAuthorized(true);
      onPaymentAuthorized();
    }, 1500);
  };

  const preAuthAmount = 25.00;

  if (isAuthorized) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl text-green-600">
            <CheckCircle2 className="size-6" />
            Payment Authorized
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle2 className="size-12 text-green-500 mx-auto mb-3" />
            <p className="font-medium text-green-900 mb-2">Pre-authorization Successful</p>
            <p className="text-green-700 text-sm">€{preAuthAmount.toFixed(2)} temporarily authorized</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Next Steps:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">1</div>
                <span>Plug the connector into your vehicle</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">2</div>
                <span>Tap "Start Charging" when ready</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">3</div>
                <span>Monitor your session in real-time</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={onContinue}
            size="lg"
            className="w-full h-14 text-base"
          >
            Start Charging Session
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Shield className="size-5 text-blue-500" />
          Secure Payment
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Pre-authorization: €{preAuthAmount.toFixed(2)} • Final amount charged after session
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-3">
          <Label className="font-medium">Choose Payment Method</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={paymentMethod === 'card' ? 'default' : 'outline'}
              onClick={() => setPaymentMethod('card')}
              className="h-12 flex items-center gap-2"
            >
              <CreditCard className="size-4" />
              Card
            </Button>
            <Button
              variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
              onClick={() => setPaymentMethod('wallet')}
              className="h-12 flex items-center gap-2"
            >
              <Smartphone className="size-4" />
              Wallet
            </Button>
          </div>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                className="h-12"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Smith"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                className="h-12"
              />
            </div>

            <Button
              onClick={handleCardPayment}
              disabled={isProcessing}
              size="lg"
              className="w-full h-14 text-base"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Authorizing Payment...
                </>
              ) : (
                `Authorize €${preAuthAmount.toFixed(2)}`
              )}
            </Button>
          </div>
        )}

        {/* Wallet Payment */}
        {paymentMethod === 'wallet' && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Smartphone className="size-12 text-gray-400 mx-auto mb-3" />
              <p className="font-medium text-gray-900 mb-2">Digital Wallet Payment</p>
              <p className="text-gray-600 text-sm mb-4">
                Use Apple Pay, Google Pay, or Samsung Pay for instant checkout
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="outline">Apple Pay</Badge>
                <Badge variant="outline">Google Pay</Badge>
                <Badge variant="outline">Samsung Pay</Badge>
              </div>
            </div>

            <Button
              onClick={handleWalletPayment}
              disabled={isProcessing}
              size="lg"
              className="w-full h-14 text-base bg-gray-900 hover:bg-gray-800"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay with Wallet €${preAuthAmount.toFixed(2)}`
              )}
            </Button>
          </div>
        )}

        {/* Security Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-blue-800">
              <p className="font-medium mb-1">Secure Transaction</p>
              <ul className="text-sm space-y-1">
                <li>• PCI-DSS compliant payment processing</li>
                <li>• 256-bit SSL encryption</li>
                <li>• No payment details stored</li>
                <li>• GDPR compliant data handling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accepted Cards */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Accepted Payment Methods</p>
          <div className="flex justify-center gap-3">
            <Badge variant="outline">Visa</Badge>
            <Badge variant="outline">Mastercard</Badge>
            <Badge variant="outline">Maestro</Badge>
            <Badge variant="outline">AMEX</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}