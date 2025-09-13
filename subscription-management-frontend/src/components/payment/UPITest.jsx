import React, { useState } from 'react';
import UPIPayment from './UPIPayment';

const UPITest = () => {
  const [showPayment, setShowPayment] = useState(false);
  
  const testPlan = {
    id: 'test-plan',
    name: 'Test Fiber Plan',
    type: 'Fibernet',
    monthlyQuota: 100,
    price: 599,
    features: ['High-speed internet', '24/7 support'],
    speed: '100 Mbps'
  };

  const handlePaymentSuccess = (plan) => {
    console.log('Payment successful for plan:', plan);
    setShowPayment(false);
    alert('Payment successful!');
  };

  const handlePaymentFailure = (error) => {
    console.log('Payment failed:', error);
    setShowPayment(false);
    alert('Payment failed: ' + error);
  };

  const handleCancel = () => {
    console.log('Payment cancelled');
    setShowPayment(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">UPI Payment Test</h1>
      <button 
        onClick={() => setShowPayment(true)}
        className="btn-primary"
      >
        Test UPI Payment
      </button>
      
      {showPayment && (
        <UPIPayment
          plan={testPlan}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={handlePaymentFailure}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default UPITest;
