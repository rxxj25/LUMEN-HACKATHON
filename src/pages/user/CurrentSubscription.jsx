import React from 'react';
import { useSubscription } from '../../contexts/SubscriptionContext.jsx';
import { useNavigate } from 'react-router-dom';
import CurrentSubscriptionComponent from '../../components/user/CurrentSubscription';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import { useState } from 'react';
import { Package, ArrowLeft, ArrowRight } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

const CurrentSubscription = () => {
  const { plans, currentSubscription, cancelSubscription, subscribeToPlan } = useSubscription();
  const navigate = useNavigate();
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Subscription</h1>
            <p className="text-gray-600 mt-2">View and manage your current subscription</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(ROUTES.USER_DASHBOARD)}
              className="btn-secondary flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => navigate(ROUTES.PLANS)}
              className="btn-primary flex items-center"
            >
              <Package className="w-4 h-4 mr-2" />
              Browse Plans
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
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
