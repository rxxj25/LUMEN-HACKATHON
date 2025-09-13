import React from 'react';
import { useSubscription } from '../../contexts/SubscriptionContext.jsx';
import CurrentSubscriptionComponent from '../../components/user/CurrentSubscription';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import { useState } from 'react';

const CurrentSubscription = () => {
  const { plans, currentSubscription, cancelSubscription, subscribeToPlan } = useSubscription();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPlan = currentSubscription 
    ? plans.find(plan => plan.id === currentSubscription.planId)
    : null;

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleRenew = async () => {
    setIsSubmitting(true);
    try {
      await subscribeToPlan(currentSubscription.planId);
    } catch (error) {
      console.error('Error renewing subscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmCancel = async () => {
    setIsSubmitting(true);
    try {
      await cancelSubscription(currentSubscription.id);
      setShowCancelModal(false);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Subscription</h1>
        <p className="text-gray-600 mt-2">View and manage your current subscription</p>
      </div>

      <CurrentSubscriptionComponent
        subscription={currentSubscription}
        plan={currentPlan}
        onCancel={handleCancel}
        onRenew={handleRenew}
      />

      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
        title="Cancel Subscription"
        message="Are you sure you want to cancel your subscription? You'll lose access to your current plan at the end of the billing period."
        confirmText="Cancel Subscription"
        type="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default CurrentSubscription;
