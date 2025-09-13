const express = require('express');
const { body } = require('express-validator');
const { protect, authorize } = require('../middleware/auth');
const {
  getAllPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
  getPlanStats
} = require('../controllers/memoryPlanController');

const router = express.Router();

// Validation rules
const planValidation = [
  body('name').notEmpty().withMessage('Plan name is required'),
  body('type').isIn(['Fibernet', 'Broadband Copper']).withMessage('Invalid plan type'),
  body('monthlyQuota').isNumeric().withMessage('Monthly quota must be a number'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('features').isArray().withMessage('Features must be an array'),
  body('provider').notEmpty().withMessage('Provider is required'),
  body('speed').notEmpty().withMessage('Speed is required')
];

// Public routes
router.get('/', getAllPlans);
router.get('/stats/overview', protect, authorize('admin'), getPlanStats);
router.get('/:id', getPlan);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), planValidation, createPlan);
router.put('/:id', protect, authorize('admin'), planValidation, updatePlan);
router.delete('/:id', protect, authorize('admin'), deletePlan);

module.exports = router;
