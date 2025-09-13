import React, { useState } from 'react';
import { Calendar, Wifi, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatCurrency, formatDate, calculateUsagePercentage, getUsageStatusColor, getUsageStatusText, getDaysUntilExpiry } from '../../utils/helpers';
import { SUBSCRIPTION_STATUS } from '../../utils/constants';
import UPIPayment from '../payment/UPIPayment';
import ConfirmationModal from '../shared/ConfirmationModal';

const CurrentSubscription = ({ subscription, plan, onCancel, onRenew }) => {
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!subscription || !plan) {
    return (
      <div className="card text-center py-12">
        <div className="text-gray-400 mb-4">
          <Wifi className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
        <p className="text-gray-600">You don't have an active subscription plan.</p>
      </div>
    );
  }

  const usagePercentage = calculateUsagePercentage(
    subscription.usageData.currentUsage,
    plan.monthlyQuota
  );
  
  const daysUntilExpiry = getDaysUntilExpiry(subscription.endDate);
  const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  const isExpired = daysUntilExpiry <= 0;

  const handleRenewClick = () => {
    setShowRenewModal(true);
  };

  const handleRenewConfirm = () => {
    setShowRenewModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    setIsSubmitting(true);
    try {
      await onRenew();
      setShowPaymentModal(false);
      alert('Subscription renewed successfully!');
    } catch (error) {
      console.error('Error renewing subscription:', error);
      alert('Renewal failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentFailure = (errorMessage) => {
    setShowPaymentModal(false);
    alert(`Payment failed: ${errorMessage}`);
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <div className="card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
            <p className="text-gray-600">{plan.type}</p>
            <div className="flex items-center mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                subscription.status === SUBSCRIPTION_STATUS.ACTIVE 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {subscription.status === SUBSCRIPTION_STATUS.ACTIVE ? (
                  <CheckCircle className="w-3 h-3 mr-1" />
                ) : (
                  <AlertTriangle className="w-3 h-3 mr-1" />
                )}
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(plan.price)}</p>
            <p className="text-sm text-gray-500">per month</p>
          </div>
        </div>

        {/* Usage Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Data Usage</span>
            <span className={`text-sm font-medium ${getUsageStatusColor(usagePercentage)}`}>
              {subscription.usageData.currentUsage} GB / {plan.monthlyQuota} GB
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${
                usagePercentage >= 90 ? 'bg-red-500' : 
                usagePercentage >= 75 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className={`text-xs ${getUsageStatusColor(usagePercentage)}`}>
              {getUsageStatusText(usagePercentage)}
            </span>
            <span className="text-xs text-gray-500">
              {usagePercentage.toFixed(1)}% used
            </span>
          </div>
        </div>

        {/* Plan Features */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Plan Features:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Subscription Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-700">Start Date</p>
              <p className="text-sm text-gray-600">{formatDate(subscription.startDate)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-700">End Date</p>
              <p className={`text-sm ${isExpired ? 'text-red-600' : isExpiringSoon ? 'text-yellow-600' : 'text-gray-600'}`}>
                {formatDate(subscription.endDate)}
                {isExpired && ' (Expired)'}
                {isExpiringSoon && !isExpired && ` (${daysUntilExpiry} days left)`}
              </p>
            </div>
          </div>
        </div>

        {/* Auto Renewal */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-700">Auto Renewal</p>
            <p className="text-sm text-gray-600">
              {subscription.autoRenew ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            subscription.autoRenew 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {subscription.autoRenew ? 'ON' : 'OFF'}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {subscription.status === SUBSCRIPTION_STATUS.ACTIVE && (
          <>
            {isExpired ? (
              <button
                onClick={handleRenewClick}
                className="btn-primary flex-1"
              >
                Renew Subscription
              </button>
            ) : (
              <button
                onClick={onCancel}
                className="btn-danger flex-1"
              >
                Cancel Subscription
              </button>
            )}
          </>
        )}
        
        {subscription.status === SUBSCRIPTION_STATUS.CANCELLED && (
          <button
            onClick={handleRenewClick}
            className="btn-primary flex-1"
          >
            Reactivate Subscription
          </button>
        )}
      </div>

      {/* Usage Recommendations */}
      {usagePercentage >= 80 && (
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">High Usage Alert</h4>
              <p className="text-sm text-yellow-700 mt-1">
                You've used {usagePercentage.toFixed(1)}% of your monthly quota. 
                Consider upgrading to a higher plan to avoid overage charges.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Renewal Confirmation Modal */}
      <ConfirmationModal
        isOpen={showRenewModal}
        onClose={() => setShowRenewModal(false)}
        onConfirm={handleRenewConfirm}
        title="Renew Subscription"
        message={`Are you sure you want to renew your ${plan.name} subscription for ${formatCurrency(plan.price)}?`}
        confirmText="Proceed to Payment"
        type="info"
        isLoading={isSubmitting}
      />

      {/* UPI Payment Modal */}
      {showPaymentModal && (
        <UPIPayment
          plan={plan}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={handlePaymentFailure}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  );
};

export default CurrentSubscription;
