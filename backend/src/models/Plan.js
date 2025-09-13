const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true,
    maxlength: [100, 'Plan name cannot exceed 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Plan type is required'],
    enum: ['Fibernet', 'Broadband Copper'],
    default: 'Fibernet'
  },
  monthlyQuota: {
    type: Number,
    required: [true, 'Monthly quota is required'],
    min: [1, 'Monthly quota must be at least 1 GB']
  },
  price: {
    type: Number,
    required: [true, 'Plan price is required'],
    min: [0, 'Price cannot be negative']
  },
  features: [{
    type: String,
    required: true,
    trim: true
  }],
  provider: {
    type: String,
    required: [true, 'Provider is required'],
    trim: true
  },
  speed: {
    type: String,
    required: [true, 'Speed is required'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isSpecial: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
planSchema.index({ type: 1, isActive: 1 });
planSchema.index({ price: 1 });
planSchema.index({ provider: 1 });

// Virtual for plan category based on price
planSchema.virtual('category').get(function() {
  if (this.isSpecial) return 'Special';
  if (this.price <= 400) return 'Budget';
  if (this.price <= 800) return 'Popular';
  if (this.price <= 1200) return 'Premium';
  return 'Business';
});

module.exports = mongoose.model('Plan', planSchema);
