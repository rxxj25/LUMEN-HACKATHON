import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { indianBroadbandPlans, indianSubscriptionAnalytics } from '../data/indianBroadbandPlans';

const SubscriptionContext = createContext();

// Debug: Verify plans data
console.log('Initial plans loaded:', indianBroadbandPlans.length);

const initialState = {
  plans: indianBroadbandPlans, // Load plans immediately
  subscriptions: [],
  currentSubscription: null,
  isLoading: false,
  error: null,
};

const subscriptionReducer = (state, action) => {
  console.log('Reducer action:', action.type, 'Plans before:', state.plans.length);
  
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_PLANS':
      console.log('SET_PLANS: Setting', action.payload.length, 'plans');
      return { ...state, plans: action.payload, isLoading: false };
    case 'ADD_PLAN':
      return { ...state, plans: [...state.plans, action.payload] };
    case 'UPDATE_PLAN':
      return {
        ...state,
        plans: state.plans.map(plan =>
          plan.id === action.payload.id ? action.payload : plan
        ),
      };
    case 'DELETE_PLAN':
      return {
        ...state,
        plans: state.plans.filter(plan => plan.id !== action.payload),
      };
    case 'SET_SUBSCRIPTIONS':
      return { ...state, subscriptions: action.payload, isLoading: false };
    case 'SET_CURRENT_SUBSCRIPTION':
      return { ...state, currentSubscription: action.payload };
    case 'ADD_SUBSCRIPTION':
      console.log('ADD_SUBSCRIPTION: Plans after:', state.plans.length);
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
        currentSubscription: action.payload,
      };
    case 'UPDATE_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: state.subscriptions.map(sub =>
          sub.id === action.payload.id ? action.payload : sub
        ),
        currentSubscription: state.currentSubscription?.id === action.payload.id 
          ? action.payload 
          : state.currentSubscription,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const SubscriptionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState);
  const { user, role } = useAuth();

  // Use Indian broadband plans data
  const mockPlans = indianBroadbandPlans;

  const mockSubscriptions = [
    {
      id: 'sub-1',
      userId: 'user-1',
      planId: 'fiber-unlimited-200',
      status: 'active',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-02-01T00:00:00Z',
      autoRenew: true,
      usageData: {
        currentUsage: 120, // GB used out of 200 GB
        lastUpdated: '2024-01-15T10:30:00Z',
      },
    },
    {
      id: 'sub-2',
      userId: 'user-2',
      planId: 'broadband-premium-80',
      status: 'active',
      startDate: '2024-01-10T00:00:00Z',
      endDate: '2024-02-10T00:00:00Z',
      autoRenew: true,
      usageData: {
        currentUsage: 45, // GB used out of 80 GB
        lastUpdated: '2024-01-15T14:20:00Z',
      },
    },
    {
      id: 'sub-3',
      userId: 'user-3',
      planId: 'fiber-basic-50',
      status: 'cancelled',
      startDate: '2023-12-01T00:00:00Z',
      endDate: '2024-01-01T00:00:00Z',
      autoRenew: false,
      usageData: {
        currentUsage: 35, // GB used out of 50 GB
        lastUpdated: '2023-12-28T16:45:00Z',
      },
    },
  ];

  // Load subscriptions data
  useEffect(() => {
    const loadSubscriptions = () => {
      try {
        // Load subscriptions for authenticated users
        if (user && role === 'user') {
          const userSubscriptions = mockSubscriptions.filter(sub => sub.userId === user.id);
          dispatch({ type: 'SET_SUBSCRIPTIONS', payload: userSubscriptions });
          
          const current = userSubscriptions.find(sub => sub.status === 'active');
          if (current) {
            dispatch({ type: 'SET_CURRENT_SUBSCRIPTION', payload: current });
          }
        } else {
          // For testing - load a default subscription if no user
          console.log('No user authenticated, loading default subscription for testing');
          dispatch({ type: 'SET_SUBSCRIPTIONS', payload: mockSubscriptions });
          dispatch({ type: 'SET_CURRENT_SUBSCRIPTION', payload: mockSubscriptions[0] });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    loadSubscriptions();
  }, [user, role]);

  // Plan operations
  const createPlan = async (planData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const newPlan = {
        ...planData,
        id: `plan-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'ADD_PLAN', payload: newPlan });
      return { success: true, data: newPlan };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const updatePlan = async (planId, planData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const updatedPlan = {
        ...planData,
        id: planId,
        updatedAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'UPDATE_PLAN', payload: updatedPlan });
      return { success: true, data: updatedPlan };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const deletePlan = async (planId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      dispatch({ type: 'DELETE_PLAN', payload: planId });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Subscription operations
  const subscribeToPlan = async (planId) => {
    console.log('subscribeToPlan called with planId:', planId);
    console.log('Current plans before subscription:', state.plans.length);
    
    try {
      const plan = state.plans.find(p => p.id === planId);
      if (!plan) {
        console.error('Plan not found:', planId);
        throw new Error('Plan not found');
      }

      // Use user.id if authenticated, otherwise use a default user ID for testing
      const userId = user?.id || 'user-1';

      const newSubscription = {
        id: `sub-${Date.now()}`,
        userId: userId,
        planId,
        status: 'active',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        autoRenew: true,
        usageData: {
          currentUsage: 0,
          lastUpdated: new Date().toISOString(),
        },
      };

      console.log('Adding subscription:', newSubscription);
      dispatch({ type: 'ADD_SUBSCRIPTION', payload: newSubscription });
      console.log('Subscription added successfully');
      return { success: true, data: newSubscription };
    } catch (error) {
      console.error('Error in subscribeToPlan:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const cancelSubscription = async (subscriptionId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const updatedSubscription = {
        ...state.subscriptions.find(sub => sub.id === subscriptionId),
        status: 'cancelled',
      };
      
      dispatch({ type: 'UPDATE_SUBSCRIPTION', payload: updatedSubscription });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const reloadPlans = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Reloading plans:', mockPlans);
      dispatch({ type: 'SET_PLANS', payload: mockPlans });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const value = {
    ...state,
    createPlan,
    updatePlan,
    deletePlan,
    subscribeToPlan,
    cancelSubscription,
    clearError,
    reloadPlans,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
