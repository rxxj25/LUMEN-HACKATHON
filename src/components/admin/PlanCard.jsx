import React from 'react';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { formatCurrency, getPlanTypeColor } from '../../utils/helpers';
import { PLAN_TYPES } from '../../utils/constants';

const PlanCard = ({ plan, onEdit, onDelete, onToggleStatus }) => {
  const handleEdit = () => {
    onEdit(plan);
  };

  const handleDelete = () => {
    onDelete(plan.id);
  };

  const handleToggleStatus = () => {
    onToggleStatus(plan.id, !plan.isActive);
  };

  return (
    <div className={`card hover:shadow-md transition-shadow duration-200 ${
      !plan.isActive ? 'opacity-60' : ''
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanTypeColor(plan.type)}`}>
            {plan.type}
          </span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(plan.price)}</p>
          <p className="text-sm text-gray-500">per month</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Monthly Quota</span>
          <span className="text-sm text-gray-900">{plan.monthlyQuota} GB</span>
        </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: '100%' }}
              />
            </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleStatus}
            className={`p-2 rounded-lg transition-colors ${
              plan.isActive 
                ? 'text-green-600 hover:bg-green-50' 
                : 'text-gray-400 hover:bg-gray-50'
            }`}
            title={plan.isActive ? 'Disable plan' : 'Enable plan'}
          >
            {plan.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <span className={`text-xs font-medium ${
            plan.isActive ? 'text-green-600' : 'text-gray-400'
          }`}>
            {plan.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit plan"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete plan"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
