const memoryDB = require('../utils/memoryDB');

// @desc    Get user's current subscription
// @route   GET /api/subscriptions/current
// @access  Private
const getCurrentSubscription = async (req, res) => {
  try {
    const subscription = memoryDB.findActiveSubscriptionByUser(req.user._id);

    if (!subscription) {
      return res.json({
        success: true,
        data: null,
        message: 'No active subscription found'
      });
    }

    // Get plan details
    const plan = memoryDB.findById('plans', subscription.plan);
    subscription.plan = plan;

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Get current subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching current subscription'
    });
  }
};

// @desc    Subscribe to a plan
// @route   POST /api/subscriptions/subscribe
// @access  Private
const subscribeToPlan = async (req, res) => {
  try {
    const { planId, paymentMethod, transactionId } = req.body;

    // Check if plan exists
    const plan = memoryDB.findById('plans', planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    if (!plan.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Plan is not available for subscription'
      });
    }

    // Check if user already has an active subscription
    const existingSubscription = memoryDB.findActiveSubscriptionByUser(req.user._id);

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'User already has an active subscription'
      });
    }

    // Calculate end date (30 days from now)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    // Create subscription
    const subscription = memoryDB.create('subscriptions', {
      user: req.user._id,
      plan: planId,
      planId: planId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'active',
      autoRenew: true,
      usageData: {
        currentUsage: 0,
        lastResetDate: startDate.toISOString()
      },
      paymentHistory: [{
        amount: plan.price,
        paymentMethod,
        transactionId,
        paymentDate: startDate.toISOString(),
        status: 'success'
      }]
    });

    // Populate the plan data
    subscription.plan = plan;

    res.status(201).json({
      success: true,
      data: subscription,
      message: 'Subscription created successfully'
    });
  } catch (error) {
    console.error('Subscribe to plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating subscription'
    });
  }
};

// @desc    Cancel subscription
// @route   PUT /api/subscriptions/cancel
// @access  Private
const cancelSubscription = async (req, res) => {
  try {
    const subscription = memoryDB.findActiveSubscriptionByUser(req.user._id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    memoryDB.update('subscriptions', subscription._id, { status: 'cancelled' });

    res.json({
      success: true,
      message: 'Subscription cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling subscription'
    });
  }
};

// @desc    Renew subscription
// @route   PUT /api/subscriptions/renew
// @access  Private
const renewSubscription = async (req, res) => {
  try {
    const { paymentMethod, transactionId } = req.body;

    const subscription = memoryDB.findActiveSubscriptionByUser(req.user._id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    // Get plan details
    const plan = memoryDB.findById('plans', subscription.plan);

    // Extend subscription by 30 days
    const newEndDate = new Date(subscription.endDate);
    newEndDate.setDate(newEndDate.getDate() + 30);
    
    const updatedSubscription = memoryDB.update('subscriptions', subscription._id, {
      endDate: newEndDate.toISOString(),
      paymentHistory: [
        ...subscription.paymentHistory,
        {
          amount: plan.price,
          paymentMethod,
          transactionId,
          paymentDate: new Date().toISOString(),
          status: 'success'
        }
      ]
    });

    updatedSubscription.plan = plan;

    res.json({
      success: true,
      data: updatedSubscription,
      message: 'Subscription renewed successfully'
    });
  } catch (error) {
    console.error('Renew subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error renewing subscription'
    });
  }
};

// @desc    Get subscription history
// @route   GET /api/subscriptions/history
// @access  Private
const getSubscriptionHistory = async (req, res) => {
  try {
    const subscriptions = memoryDB.findSubscriptionsByUser(req.user._id);
    
    // Populate plan data
    const subscriptionsWithPlans = subscriptions.map(sub => {
      const plan = memoryDB.findById('plans', sub.plan);
      return { ...sub, plan };
    });

    res.json({
      success: true,
      count: subscriptionsWithPlans.length,
      data: subscriptionsWithPlans
    });
  } catch (error) {
    console.error('Get subscription history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subscription history'
    });
  }
};

// @desc    Update usage data
// @route   PUT /api/subscriptions/usage
// @access  Private
const updateUsage = async (req, res) => {
  try {
    const { usage } = req.body;

    const subscription = memoryDB.findActiveSubscriptionByUser(req.user._id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    const updatedSubscription = memoryDB.update('subscriptions', subscription._id, {
      'usageData.currentUsage': usage
    });

    // Get plan details
    const plan = memoryDB.findById('plans', subscription.plan);
    updatedSubscription.plan = plan;

    res.json({
      success: true,
      data: updatedSubscription,
      message: 'Usage updated successfully'
    });
  } catch (error) {
    console.error('Update usage error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating usage'
    });
  }
};

module.exports = {
  getCurrentSubscription,
  subscribeToPlan,
  cancelSubscription,
  renewSubscription,
  getSubscriptionHistory,
  updateUsage
};
