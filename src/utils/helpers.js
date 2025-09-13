import { PLAN_TYPES, SUBSCRIPTION_STATUS } from './constants';

// Format currency (Indian Rupees)
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format date and time
export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Calculate usage percentage
export const calculateUsagePercentage = (currentUsage, monthlyQuota) => {
  if (!monthlyQuota || monthlyQuota === 0) return 0;
  return Math.min((currentUsage / monthlyQuota) * 100, 100);
};

// Get usage status color
export const getUsageStatusColor = (percentage) => {
  if (percentage >= 90) return 'text-red-600';
  if (percentage >= 75) return 'text-yellow-600';
  return 'text-green-600';
};

// Get usage status text
export const getUsageStatusText = (percentage) => {
  if (percentage >= 90) return 'Critical';
  if (percentage >= 75) return 'High';
  return 'Normal';
};

// Filter plans by type
export const filterPlansByType = (plans, type) => {
  if (!type || type === 'all') return plans;
  return plans.filter(plan => plan.type === type);
};

// Filter plans by price range
export const filterPlansByPrice = (plans, minPrice, maxPrice) => {
  return plans.filter(plan => {
    const price = plan.price;
    return price >= minPrice && price <= maxPrice;
  });
};

// Sort plans
export const sortPlans = (plans, sortBy, order = 'asc') => {
  return [...plans].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'quota':
        aValue = a.monthlyQuota;
        bValue = b.monthlyQuota;
        break;
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      default:
        return 0;
    }
    
    if (order === 'desc') {
      return bValue > aValue ? 1 : -1;
    }
    return aValue > bValue ? 1 : -1;
  });
};

// Get plan type color
export const getPlanTypeColor = (type) => {
  switch (type) {
    case PLAN_TYPES.FIBERNET:
      return 'bg-blue-100 text-blue-800';
    case PLAN_TYPES.BROADBAND_COPPER:
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Get subscription status color
export const getSubscriptionStatusColor = (status) => {
  switch (status) {
    case SUBSCRIPTION_STATUS.ACTIVE:
      return 'bg-green-100 text-green-800';
    case SUBSCRIPTION_STATUS.CANCELLED:
      return 'bg-red-100 text-red-800';
    case SUBSCRIPTION_STATUS.EXPIRED:
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Calculate days until expiry
export const getDaysUntilExpiry = (endDate) => {
  const now = new Date();
  const expiry = new Date(endDate);
  const diffTime = expiry - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate form data
export const validatePlanForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) {
    errors.name = 'Plan name is required';
  }
  
  if (!formData.type) {
    errors.type = 'Plan type is required';
  }
  
  if (!formData.monthlyQuota || formData.monthlyQuota <= 0) {
    errors.monthlyQuota = 'Monthly quota must be greater than 0';
  }
  
  if (!formData.price || formData.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }
  
  if (!formData.features || formData.features.length === 0) {
    errors.features = 'At least one feature is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
