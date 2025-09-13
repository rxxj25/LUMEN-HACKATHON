import React, { useState } from "react";
import AdminPlans from "./pages/admin/plan";
import AdminAnalysis from "./pages/admin/Analysis";
import TabNavigation from "./components/TabNavigation";

export default function App() {
  const [activeTab, setActiveTab] = useState('plans');

  const renderContent = () => {
    switch (activeTab) {
      case 'plans':
        return <AdminPlans />;
      case 'analysis':
        return <AdminAnalysis />;
      default:
        return <AdminPlans />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Subscription Management</h1>
                <p className="text-gray-600 text-lg">Manage your subscription plans and analytics</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}


