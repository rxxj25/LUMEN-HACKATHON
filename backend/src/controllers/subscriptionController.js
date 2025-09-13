const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Get user's current subscription
// @route   GET /api/subscriptions/current
// @access  Private
const getCurrentSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: 'active'
    }).populate('plan', 'name type monthlyQuota price features provider speed');

    if (!subscription) {
      return res.json({
        success: true,
        data: null,
        message: 'No active subscription found'
      });
    }

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { planId, paymentMethod, transactionId } = req.body;

    // Check if plan exists
    const plan = await Plan.findById(planId);
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
    const existingSubscription = await Subscription.findOne({
      user: req.user._id,
      status: 'active'
    });

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
    const subscription = await Subscription.create({
      user: req.user._id,
      plan: planId,
      planId: planId,
      startDate,
      endDate,
      paymentHistory: [{
        amount: plan.price,
        paymentMethod,
        transactionId,
        status: 'success'
      }]
    });

    // Populate the plan data
    await subscription.populate('plan', 'name type monthlyQuota price features provider speed');

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
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    subscription.status = 'cancelled';
    await subscription.save();

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

    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: 'active'
    }).populate('plan');

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    // Extend subscription by 30 days
    const newEndDate = new Date(subscription.endDate);
    newEndDate.setDate(newEndDate.getDate() + 30);
    
    subscription.endDate = newEndDate;
    subscription.paymentHistory.push({
      amount: subscription.plan.price,
      paymentMethod,
      transactionId,
      status: 'success'
    });

    await subscription.save();

    res.json({
      success: true,
      data: subscription,
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
    const subscriptions = await Subscription.find({
      user: req.user._id
    }).populate('plan', 'name type monthlyQuota price features provider speed')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
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

    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: 'active'
    }).populate('plan');

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    subscription.usageData.currentUsage = usage;
    await subscription.save();

    res.json({
      success: true,
      data: subscription,
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
