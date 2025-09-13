import React from "react";

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-1">
            <button
              onClick={() => onTabChange('plans')}
              className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === 'plans'
                  ? 'text-blue-700 bg-blue-100 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Manage Plans
            </button>
            <button
              onClick={() => onTabChange('analysis')}
              className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === 'analysis'
                  ? 'text-blue-700 bg-blue-100 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
