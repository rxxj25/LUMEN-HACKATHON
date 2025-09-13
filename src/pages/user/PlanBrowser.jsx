import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { useSubscription } from '../../contexts/SubscriptionContext.jsx';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import UPIPayment from '../../components/payment/UPIPayment';
import { PLAN_TYPES } from '../../utils/constants';
import { formatCurrency, getPlanTypeColor, filterPlansByType, sortPlans } from '../../utils/helpers';

const PlanBrowser = () => {
  const { plans, currentSubscription, subscribeToPlan, isLoading, error, reloadPlans } = useSubscription();
  
  // Debug logging
  console.log('PlanBrowser - plans:', plans);
  console.log('PlanBrowser - plans length:', plans.length);
  console.log('PlanBrowser - isLoading:', isLoading);
  console.log('PlanBrowser - currentSubscription:', currentSubscription);
  console.log('PlanBrowser - error:', error);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debug: Log when component mounts and plans change
  useEffect(() => {
    console.log('PlanBrowser mounted/updated - Plans count:', plans.length);
  }, [plans.length]);

  // Filter and sort plans
  const filteredPlans = plans
    .filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || plan.type === filterType;
      const isActive = plan.isActive;
      console.log('Filtering plan:', plan.name, 'matchesSearch:', matchesSearch, 'matchesType:', matchesType, 'isActive:', isActive);
      return matchesSearch && matchesType && isActive;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return sortPlans([a, b], sortBy, sortOrder);
    });

  console.log('Filtered plans:', filteredPlans);

  const handleSubscribe = (plan) => {
    console.log('Subscribe button clicked for plan:', plan);
    setSelectedPlan(plan);
    setShowSubscribeModal(true);
    console.log('Subscribe modal should be showing:', true);
  };

  const handlePaymentSuccess = async (plan) => {
    setIsSubmitting(true);
    try {
      await subscribeToPlan(plan.id);
      setShowPaymentModal(false);
      setSelectedPlan(null);
      // Show success notification
      alert(`Payment successful! You are now subscribed to ${plan.name}`);
    } catch (error) {
      console.error('Error subscribing to plan:', error);
      alert('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentFailure = (errorMessage) => {
    setShowPaymentModal(false);
    setSelectedPlan(null);
    alert(`Payment failed: ${errorMessage}`);
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    setSelectedPlan(null);
  };

  const confirmSubscribe = () => {
    if (!selectedPlan) return;
    
    setShowSubscribeModal(false);
    setShowPaymentModal(true);
  };

  const isCurrentPlan = (plan) => {
    return currentSubscription && currentSubscription.planId === plan.id;
  };

  const PlanCard = ({ plan }) => {
    const isCurrent = isCurrentPlan(plan);
    const isPopular = plan.price <= 800; // Popular plans under ₹800

    return (
      <div className={`card lumen-card-hover ${
        isCurrent ? 'ring-2 ring-orange-500 bg-orange-50' : ''
      } ${isPopular ? 'relative' : ''}`}>
        {isPopular && (
          <div className="absolute -top-3 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Popular
          </div>
        )}
        
        {isCurrent && (
          <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Current Plan
          </div>
        )}

        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getPlanTypeColor(plan.type)}`}>
              {plan.type}
            </span>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(plan.price)}</p>
            <p className="text-sm text-gray-500">per month</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Monthly Data</span>
            <span className="text-lg font-semibold text-gray-900">{plan.monthlyQuota} GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-full" />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Features:</h4>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => handleSubscribe(plan)}
          disabled={isCurrent}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
            isCurrent
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'btn-primary flex items-center justify-center'
          }`}
        >
          {isCurrent ? (
            'Current Plan'
          ) : (
            <>
              Subscribe Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse Plans</h1>
        <p className="text-gray-600 mt-2">Choose the perfect plan for your needs</p>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-field"
            >
              <option value="all">All Types</option>
              <option value={PLAN_TYPES.FIBERNET}>Fibernet</option>
              <option value={PLAN_TYPES.BROADBAND_COPPER}>Broadband Copper</option>
            </select>
            
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="input-field"
            >
              <option value="price-asc">Price Low-High</option>
              <option value="price-desc">Price High-Low</option>
              <option value="quota-asc">Data Low-High</option>
              <option value="quota-desc">Data High-Low</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">⚠️</div>
            <div>
              <h3 className="text-sm font-medium text-red-800">Error loading plans</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Plans Grid */}
      {filteredPlans.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No plans found</h3>
          <p className="text-gray-600">
            {error ? 'There was an error loading plans.' : 'Try adjusting your search or filter criteria.'}
          </p>
          {!error && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Plans loaded: {plans.length} | Filtered: {filteredPlans.length}
              </p>
              {plans.length === 0 && (
                <button
                  onClick={reloadPlans}
                  className="mt-2 btn-secondary text-sm"
                >
                  Reload Plans
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}

      {/* Subscribe Confirmation Modal */}
      <ConfirmationModal
        isOpen={showSubscribeModal}
        onClose={() => {
          setShowSubscribeModal(false);
          setSelectedPlan(null);
        }}
        onConfirm={confirmSubscribe}
        title="Subscribe to Plan"
        message={`Are you sure you want to subscribe to ${selectedPlan?.name} for ${formatCurrency(selectedPlan?.price)} per month?`}
        confirmText="Subscribe"
        type="info"
        isLoading={isSubmitting}
      />

      {/* UPI Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <UPIPayment
          plan={selectedPlan}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={handlePaymentFailure}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  );
};

export default PlanBrowser;
