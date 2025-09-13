const memoryDB = require('../utils/memoryDB');
const bcrypt = require('bcryptjs');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
const getAllPlans = async (req, res) => {
  try {
    const { type, minPrice, maxPrice, provider, isActive } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (type) filter.type = type;
    if (provider) filter.provider = provider;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const plans = memoryDB.find('plans', filter).sort((a, b) => a.price - b.price);
    
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
    const plan = memoryDB.findById('plans', req.params.id);
    
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
    const plan = memoryDB.create('plans', req.body);
    
    res.status(201).json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('Create plan error:', error);
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
    const plan = memoryDB.update('plans', req.params.id, req.body);
    
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
    const plan = memoryDB.delete('plans', req.params.id);
    
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
    const stats = memoryDB.getStats();
    const plans = memoryDB.find('plans');
    
    const priceStats = plans.reduce((acc, plan) => {
      acc.total += plan.price;
      acc.min = Math.min(acc.min, plan.price);
      acc.max = Math.max(acc.max, plan.price);
      return acc;
    }, { total: 0, min: Infinity, max: -Infinity });
    
    res.json({
      success: true,
      data: {
        totalPlans: stats.totalPlans,
        activePlans: stats.activePlans,
        fibernetPlans: memoryDB.count('plans', { type: 'Fibernet' }),
        broadbandPlans: memoryDB.count('plans', { type: 'Broadband Copper' }),
        priceStats: {
          avgPrice: plans.length > 0 ? priceStats.total / plans.length : 0,
          minPrice: priceStats.min === Infinity ? 0 : priceStats.min,
          maxPrice: priceStats.max === -Infinity ? 0 : priceStats.max
        }
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
