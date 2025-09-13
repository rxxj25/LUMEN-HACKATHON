// src/routes/plan.routes.js
import express from 'express';
import { createPlan, listPlans, getPlan, updatePlan, togglePlan } from '../controllers/planController.js';
import { requireAuth } from '../middleware/auth.js';
import { ensureRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', listPlans);
router.get('/:id', getPlan);

// Admin-only routes
router.post('/', requireAuth, ensureRole('admin'), createPlan);
router.put('/:id', requireAuth, ensureRole('admin'), updatePlan);
router.patch('/:id/toggle', requireAuth, ensureRole('admin'), togglePlan);

export default router;
