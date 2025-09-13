const Plan = require('../models/Plan');
const { validationResult } = require('express-validator');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
const getAllPlans = async (req, res) => {
  try {
    const { type, minPrice, maxPrice, provider, isActive } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (type) filter.type = type;
    if (provider) filter.provider = { $regex: provider, $options: 'i' };
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const plans = await Plan.find(filter).sort({ price: 1 });
    
    res.json({
      success: true,
      count: plans.length,
      data: plans
    });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching plans'
    });
  }
};

// @desc    Get single plan
// @route   GET /api/plans/:id
// @access  Public
const getPlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching plan'
    });
  }
};

// @desc    Create new plan
// @route   POST /api/plans
// @access  Private/Admin
const createPlan = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const plan = await Plan.create(req.body);
    
    res.status(201).json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('Create plan error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Plan with this name already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating plan'
    });
  }
};

// @desc    Update plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
const updatePlan = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('Update plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating plan'
    });
  }
};

// @desc    Delete plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Plan deleted successfully'
    });
  } catch (error) {
    console.error('Delete plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting plan'
    });
  }
};

// @desc    Get plan statistics
// @route   GET /api/plans/stats/overview
// @access  Private/Admin
const getPlanStats = async (req, res) => {
  try {
    const totalPlans = await Plan.countDocuments();
    const activePlans = await Plan.countDocuments({ isActive: true });
    const fibernetPlans = await Plan.countDocuments({ type: 'Fibernet' });
    const broadbandPlans = await Plan.countDocuments({ type: 'Broadband Copper' });
    
    const priceStats = await Plan.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        totalPlans,
        activePlans,
        fibernetPlans,
        broadbandPlans,
        priceStats: priceStats[0] || { avgPrice: 0, minPrice: 0, maxPrice: 0 }
      }
    });
  } catch (error) {
    console.error('Get plan stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching plan statistics'
    });
  }
};

module.exports = {
  getAllPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
  getPlanStats
};
