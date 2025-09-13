import React from "react";

export default function PlanTable({ plans, onDelete, onEdit }) {
  if (plans.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-16 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-3xl text-gray-400">📋</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">No plans available</h3>
        <p className="text-gray-600 text-lg">Add a plan to get started with your subscription management.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <h3 className="text-xl font-bold text-gray-900">Current Plans</h3>
        <p className="text-gray-600 mt-1">Manage your subscription plans</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Plan Details
              </th>
              <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Pricing
              </th>
              <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Features
              </th>
              <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Validity
              </th>
              <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {plans.map((plan, index) => (
              <tr key={plan.id} className="hover:bg-gray-50 transition-colors duration-200 group">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {plan.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{plan.name}</div>
                      <div className="text-xs text-gray-500 max-w-xs truncate">
                        {plan.description || "No description"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="text-lg font-bold text-gray-900">₹{plan.price}</div>
                  <div className="text-xs text-gray-500">per month</div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">{plan.quota}</span>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{plan.validityDays} days</span>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onEdit(plan)}
                      className="px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(plan.id)}
                      className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}