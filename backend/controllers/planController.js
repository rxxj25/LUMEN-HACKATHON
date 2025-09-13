// src/controllers/plan.controller.js
import Plan from '../models/Plan.js';

// Create a new plan (admin only)
export const createPlan = async (req, res, next) => {
  try {
    const { name, type, monthlyPrice, dataQuotaGB, features, externalId } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'name required' });

    const plan = new Plan({ externalId, name, type, monthlyPrice, dataQuotaGB, features });
    await plan.save();

    return res.status(201).json({ success: true, plan });
  } catch (err) {
    next(err);
  }
};

// List all plans (public)
export const listPlans = async (req, res, next) => {
  try {
    const { active } = req.query;
    const filter = {};
    if (active !== undefined) filter.active = active === 'true';

    const plans = await Plan.find(filter).sort({ monthlyPrice: 1 });
    return res.json({ success: true, plans });
  } catch (err) {
    next(err);
  }
};

// Get single plan
export const getPlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    return res.json({ success: true, plan });
  } catch (err) {
    next(err);
  }
};

// Update plan (admin only)
export const updatePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    return res.json({ success: true, plan });
  } catch (err) {
    next(err);
  }
};

// Toggle active/inactive (soft delete)
export const togglePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    plan.active = !plan.active;
    await plan.save();

    return res.json({ success: true, plan });
  } catch (err) {
    next(err);
  }
};
