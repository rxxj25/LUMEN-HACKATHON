// src/models/Plan.js
import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema({
  externalId: { type: String, default: null },   // optional mapping to dataset
  name: { type: String, required: true },
  type: { type: String },                        // e.g., Fibernet, Broadband Copper
  monthlyPrice: { type: Number, required: true, default: 0 },
  dataQuotaGB: { type: Number, required: true, default: 0 },
  features: { type: [String], default: [] },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

PlanSchema.index({ name: 1 });

export default mongoose.model('Plan', PlanSchema);
