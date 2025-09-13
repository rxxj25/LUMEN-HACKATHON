import React from 'react';
import { TrendingUp, ArrowRight, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const RecommendationCard = ({ recommendation, onSubscribe }) => {
  if (!recommendation) {
    return null;
  }

  const { plan, reason, savings } = recommendation;

  return (
    <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recommended Plan</h3>
            <p className="text-sm text-gray-600">AI-powered recommendation</p>
          </div>
        </div>
        <div className="flex items-center text-yellow-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="ml-1 text-sm font-medium">Best Match</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600">{plan.type}</p>
            <p className="text-sm text-gray-600">{plan.monthlyQuota} GB monthly quota</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(plan.price)}</p>
            <p className="text-sm text-gray-500">per month</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Why this plan?</h5>
        <p className="text-sm text-gray-600 mb-3">{reason}</p>
        
        {savings && (
          <div className="flex items-center text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Save {formatCurrency(savings)} per month</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          {plan.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
              {feature}
            </li>
          ))}
          {plan.features.length > 3 && (
            <li className="text-xs text-gray-500">
              +{plan.features.length - 3} more features
            </li>
          )}
        </ul>
      </div>

      <button
        onClick={() => onSubscribe(plan.id)}
        className="w-full btn-primary flex items-center justify-center"
      >
        Subscribe Now
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

export default RecommendationCard;
