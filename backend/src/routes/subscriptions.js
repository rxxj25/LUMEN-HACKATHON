const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  getCurrentSubscription,
  subscribeToPlan,
  cancelSubscription,
  renewSubscription,
  getSubscriptionHistory,
  updateUsage
} = require('../controllers/memorySubscriptionController');

const router = express.Router();

// All routes are protected
router.use(protect);

// Validation rules
const subscriptionValidation = [
  body('planId').isMongoId().withMessage('Valid plan ID is required'),
  body('paymentMethod').isIn(['upi', 'card', 'netbanking']).withMessage('Invalid payment method'),
  body('transactionId').notEmpty().withMessage('Transaction ID is required')
];

const usageValidation = [
  body('usage').isNumeric().withMessage('Usage must be a number')
];

// Routes
router.get('/current', getCurrentSubscription);
router.get('/history', getSubscriptionHistory);
router.post('/subscribe', subscriptionValidation, subscribeToPlan);
router.put('/cancel', cancelSubscription);
router.put('/renew', subscriptionValidation, renewSubscription);
router.put('/usage', usageValidation, updateUsage);

module.exports = router;
