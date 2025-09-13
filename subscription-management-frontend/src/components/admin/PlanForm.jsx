import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { PLAN_TYPES } from '../../utils/constants';
import { validatePlanForm } from '../../utils/helpers';

const PlanForm = ({ plan, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: PLAN_TYPES.FIBERNET,
    monthlyQuota: '',
    price: '',
    features: [''],
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || '',
        type: plan.type || PLAN_TYPES.FIBERNET,
        monthlyQuota: plan.monthlyQuota || '',
        price: plan.price || '',
        features: plan.features?.length > 0 ? [...plan.features] : [''],
        isActive: plan.isActive !== undefined ? plan.isActive : true,
      });
    }
  }, [plan]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFeatureChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty features
    const filteredFeatures = formData.features.filter(feature => feature.trim() !== '');
    
    const dataToValidate = {
      ...formData,
      features: filteredFeatures,
      monthlyQuota: Number(formData.monthlyQuota),
      price: Number(formData.price),
    };

    const validation = validatePlanForm(dataToValidate);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave(dataToValidate);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {plan ? 'Edit Plan' : 'Create New Plan'}
              </h3>
              <button
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`input-field ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="Enter plan name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`input-field ${errors.type ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                >
                  <option value={PLAN_TYPES.FIBERNET}>Fibernet</option>
                  <option value={PLAN_TYPES.BROADBAND_COPPER}>Broadband Copper</option>
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="monthlyQuota" className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Quota (GB) *
                  </label>
                  <input
                    type="number"
                    id="monthlyQuota"
                    name="monthlyQuota"
                    value={formData.monthlyQuota}
                    onChange={handleInputChange}
                    min="1"
                    className={`input-field ${errors.monthlyQuota ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="100"
                  />
                  {errors.monthlyQuota && <p className="mt-1 text-sm text-red-600">{errors.monthlyQuota}</p>}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`input-field ${errors.price ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="29.99"
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features *
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="input-field flex-1"
                        placeholder="Enter feature"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Feature
                  </button>
                </div>
                {errors.features && <p className="mt-1 text-sm text-red-600">{errors.features}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Plan is active
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : (plan ? 'Update Plan' : 'Create Plan')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanForm;
