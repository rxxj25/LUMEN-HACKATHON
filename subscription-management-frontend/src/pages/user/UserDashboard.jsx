import React, { useState, useEffect } from 'react';
import { useSubscription } from '../../contexts/SubscriptionContext.jsx';
import CurrentSubscription from '../../components/user/CurrentSubscription';
import RecommendationCard from '../../components/user/RecommendationCard';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import { 
  Wifi, 
  TrendingUp, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { formatCurrency, calculateUsagePercentage } from '../../utils/helpers';

const UserDashboard = () => {
  const { 
    plans, 
    currentSubscription, 
    subscribeToPlan, 
    cancelSubscription,
    isLoading 
  } = useSubscription();
  
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find current plan
  const currentPlan = currentSubscription 
    ? plans.find(plan => plan.id === currentSubscription.planId)
    : null;

  // Generate recommendation
  const getRecommendation = () => {
    if (!currentSubscription || !currentPlan) return null;

    const usagePercentage = calculateUsagePercentage(
      currentSubscription.usageData.currentUsage,
      currentPlan.monthlyQuota
    );

    // If usage is high, recommend next higher plan
    if (usagePercentage >= 80) {
      const higherPlans = plans
        .filter(plan => plan.monthlyQuota > currentPlan.monthlyQuota && plan.isActive)
        .sort((a, b) => a.monthlyQuota - b.monthlyQuota);

      if (higherPlans.length > 0) {
        const recommendedPlan = higherPlans[0];
        const savings = currentPlan.price - recommendedPlan.price; // This would be negative, showing it's more expensive

        return {
          plan: recommendedPlan,
          reason: `You're using ${usagePercentage.toFixed(1)}% of your current plan. Upgrade to avoid overage charges and get more data.`,
          savings: null, // No savings for upgrade
        };
      }
    }

    // If usage is low, recommend cheaper plan
    if (usagePercentage <= 30) {
      const lowerPlans = plans
        .filter(plan => plan.monthlyQuota < currentPlan.monthlyQuota && plan.isActive)
        .sort((a, b) => b.monthlyQuota - a.monthlyQuota);

      if (lowerPlans.length > 0) {
        const recommendedPlan = lowerPlans[0];
        const savings = currentPlan.price - recommendedPlan.price;

        return {
          plan: recommendedPlan,
          reason: `You're only using ${usagePercentage.toFixed(1)}% of your current plan. Save money with a smaller plan.`,
          savings: savings > 0 ? savings : null,
        };
      }
    }

    return null;
  };

  const recommendation = getRecommendation();

  const handleSubscribe = async (planId) => {
    setIsSubmitting(true);
    try {
      await subscribeToPlan(planId);
    } catch (error) {
      console.error('Error subscribing to plan:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelSubscription = async () => {
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

  const handleRenewSubscription = async () => {
    setIsSubmitting(true);
    try {
      // For demo purposes, we'll just reactivate the current subscription
      await subscribeToPlan(currentSubscription.planId);
    } catch (error) {
      console.error('Error renewing subscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your subscription and view usage</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Subscription */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Subscription</h2>
            <CurrentSubscription
              subscription={currentSubscription}
              plan={currentPlan}
              onCancel={() => setShowCancelModal(true)}
              onRenew={handleRenewSubscription}
            />
          </div>

          {/* Quick Stats */}
          {currentSubscription && currentPlan && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {calculateUsagePercentage(
                    currentSubscription.usageData.currentUsage,
                    currentPlan.monthlyQuota
                  ).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Usage</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {currentPlan.monthlyQuota - currentSubscription.usageData.currentUsage} GB
                </div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(currentPlan.price)}
                </div>
                <div className="text-sm text-gray-600">Monthly Cost</div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recommendations */}
          {recommendation && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <RecommendationCard
                recommendation={recommendation}
                onSubscribe={handleSubscribe}
              />
            </div>
          )}

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/plans'}
                className="w-full btn-secondary flex items-center justify-center"
              >
                <Wifi className="w-4 h-4 mr-2" />
                Browse Plans
              </button>
              
              {currentSubscription && (
                <button
                  onClick={() => window.location.href = '/subscription/history'}
                  className="w-full btn-secondary flex items-center justify-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  View History
                </button>
              )}
            </div>
          </div>

          {/* Usage Tips */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Usage Tips</h3>
            <div className="space-y-3 text-sm text-blue-800">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Monitor your usage regularly to avoid overage charges</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Consider upgrading if you consistently use over 80%</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Downgrade to save money if you use less than 30%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelSubscription}
        title="Cancel Subscription"
        message="Are you sure you want to cancel your subscription? You'll lose access to your current plan at the end of the billing period."
        confirmText="Cancel Subscription"
        type="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default UserDashboard;
