import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  CheckCircle, 
  XCircle, 
  ArrowLeft
} from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const UPIPayment = ({ 
  plan, 
  onPaymentSuccess, 
  onPaymentFailure, 
  onCancel 
}) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [paymentStep, setPaymentStep] = useState('method'); // method, upi, card, success, failure
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  // Debug logging
  console.log('UPIPayment component rendered with plan:', plan);

  // Mock UPI IDs for demo
  const mockUPIIds = [
    'user@paytm',
    'user@phonepe',
    'user@googlepay',
    'user@ybl',
    'user@upi'
  ];

  // No countdown timer needed for instant payment

  const handleUPISubmit = () => {
    if (!upiId.trim()) {
      alert('Please enter a valid UPI ID');
      return;
    }
    // Skip processing and go directly to success
    setPaymentStep('success');
    setTimeout(() => onPaymentSuccess(plan), 1500);
  };

  const handleCardSubmit = () => {
    // Validate card details
    if (!cardDetails.cardNumber.trim() || !cardDetails.expiryDate.trim() || 
        !cardDetails.cvv.trim() || !cardDetails.cardholderName.trim()) {
      alert('Please fill in all card details');
      return;
    }

    // Basic validation
    if (cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
      alert('Please enter a valid 16-digit card number');
      return;
    }

    if (cardDetails.cvv.length < 3) {
      alert('Please enter a valid CVV');
      return;
    }

    // Skip processing and go directly to success
    setPaymentStep('success');
    setTimeout(() => onPaymentSuccess(plan), 1500);
  };

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2, 4);
    }
    return digits;
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    if (method === 'upi') {
      setUpiId(mockUPIIds[Math.floor(Math.random() * mockUPIIds.length)]);
    }
    // Don't automatically navigate to payment form - let user click continue button
  };

  const renderPaymentMethods = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
      
      {/* UPI Payment */}
      <div 
        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selectedMethod === 'upi' 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => handleMethodSelect('upi')}
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">UPI Payment</h4>
            <p className="text-sm text-gray-600">Pay using UPI ID, PhonePe, Google Pay, Paytm</p>
          </div>
          <div className={`w-5 h-5 rounded-full border-2 ${
            selectedMethod === 'upi' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
          }`}>
            {selectedMethod === 'upi' && (
              <div className="w-full h-full rounded-full bg-white scale-50"></div>
            )}
          </div>
        </div>
      </div>

      {/* Card Payment */}
      <div 
        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selectedMethod === 'card' 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => handleMethodSelect('card')}
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Credit/Debit Card</h4>
            <p className="text-sm text-gray-600">Visa, Mastercard, RuPay accepted</p>
          </div>
          <div className={`w-5 h-5 rounded-full border-2 ${
            selectedMethod === 'card' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
          }`}>
            {selectedMethod === 'card' && (
              <div className="w-full h-full rounded-full bg-white scale-50"></div>
            )}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      {selectedMethod && (
        <div className="pt-4">
          <button
            onClick={() => {
              if (selectedMethod === 'upi') {
                setPaymentStep('upi');
              } else if (selectedMethod === 'card') {
                setPaymentStep('card');
              }
            }}
            className="w-full btn-primary"
          >
            Continue with {selectedMethod === 'upi' ? 'UPI Payment' : 'Card Payment'}
          </button>
        </div>
      )}
    </div>
  );

  const renderUPIForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">UPI Payment</h3>
        <p className="text-sm text-gray-600">Enter your UPI ID to proceed</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UPI ID
          </label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="Enter UPI ID (e.g., user@paytm)"
            className="input-field"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Demo UPI IDs: user@paytm, user@phonepe, user@googlepay
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Amount to Pay:</span>
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(plan.price)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-600">Plan:</span>
            <span className="text-sm font-medium text-gray-900">{plan.name}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setPaymentStep('method')}
          className="btn-secondary flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <button
          onClick={handleUPISubmit}
          className="btn-primary flex-1"
          disabled={!upiId.trim()}
        >
          Pay {formatCurrency(plan.price)}
        </button>
      </div>
    </div>
  );

  const renderCardForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Card Payment</h3>
        <p className="text-sm text-gray-600">Enter your card details to proceed</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <input
            type="text"
            value={cardDetails.cardNumber}
            onChange={(e) => setCardDetails(prev => ({
              ...prev,
              cardNumber: formatCardNumber(e.target.value)
            }))}
            placeholder="1234 5678 9012 3456"
            className="input-field"
            maxLength={19}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardDetails.cardholderName}
            onChange={(e) => setCardDetails(prev => ({
              ...prev,
              cardholderName: e.target.value
            }))}
            placeholder="John Doe"
            className="input-field"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              value={cardDetails.expiryDate}
              onChange={(e) => setCardDetails(prev => ({
                ...prev,
                expiryDate: formatExpiryDate(e.target.value)
              }))}
              placeholder="MM/YY"
              className="input-field"
              maxLength={5}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails(prev => ({
                ...prev,
                cvv: e.target.value.replace(/\D/g, '').slice(0, 3)
              }))}
              placeholder="123"
              className="input-field"
              maxLength={3}
              required
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Amount to Pay:</span>
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(plan.price)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-600">Plan:</span>
            <span className="text-sm font-medium text-gray-900">{plan.name}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setPaymentStep('method')}
          className="btn-secondary flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <button
          onClick={handleCardSubmit}
          className="btn-primary flex-1"
        >
          Pay {formatCurrency(plan.price)}
        </button>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <Loader className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please complete the payment on your UPI app
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Payment expires in {countdown} seconds
            </span>
          </div>
          <div className="text-xs text-blue-700">
            Amount: {formatCurrency(plan.price)} | UPI ID: {upiId}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setPaymentStep('failure');
          onPaymentFailure('Payment cancelled by user');
        }}
        className="btn-secondary"
      >
        Cancel Payment
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your subscription has been activated successfully
        </p>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Plan:</span>
            <span className="text-sm font-bold text-gray-900">{plan.name}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Amount Paid:</span>
            <span className="text-sm font-bold text-green-600">
              {formatCurrency(plan.price)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <span className="text-sm font-bold text-green-600">Active</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFailure = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
        <XCircle className="w-10 h-10 text-red-600" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Failed</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your payment could not be processed. Please try again.
        </p>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setPaymentStep('method')}
          className="btn-secondary flex-1"
        >
          Try Again
        </button>
        <button
          onClick={onCancel}
          className="btn-primary flex-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-orange-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Payment</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          {/* Plan Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{plan.name}</span>
              <span className="font-bold text-lg text-gray-900">
                {formatCurrency(plan.price)}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {plan.type} • {plan.monthlyQuota} GB • {plan.speed}
            </div>
            {plan.provider && (
              <div className="text-xs text-gray-500">
                Provider: {plan.provider}
              </div>
            )}
          </div>

          {/* Payment Steps */}
          {paymentStep === 'method' && renderPaymentMethods()}
          {paymentStep === 'upi' && renderUPIForm()}
          {paymentStep === 'card' && renderCardForm()}
          {paymentStep === 'success' && renderSuccess()}
          {paymentStep === 'failure' && renderFailure()}

          {/* Security Notice */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Your payment is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UPIPayment;
