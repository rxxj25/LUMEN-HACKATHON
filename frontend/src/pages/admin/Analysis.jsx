import React, { useState, useEffect } from "react";
import StatCard from "../../components/StatCard";
import ChartCard from "../../components/ChartCard";

const STORAGE_KEY = "sms_admin_plans_v1";

export default function Analysis() {
  const [plans, setPlans] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalPlans: 0,
    averagePrice: 0,
    totalRevenue: 0,
    mostPopularPlan: null
  });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const plansData = JSON.parse(raw);
      setPlans(plansData);
      calculateAnalytics(plansData);
    }
  }, []);

  const calculateAnalytics = (plansData) => {
    if (plansData.length === 0) return;

    const totalPlans = plansData.length;
    const totalPrice = plansData.reduce((sum, plan) => sum + plan.price, 0);
    const averagePrice = totalPrice / totalPlans;
    
    // Simulate revenue based on plan popularity (mock data)
    const revenueData = plansData.map(plan => ({
      ...plan,
      subscribers: Math.floor(Math.random() * 100) + 10, // Mock subscriber count
      revenue: Math.floor(Math.random() * 10000) + 1000 // Mock revenue
    }));
    
    const totalRevenue = revenueData.reduce((sum, plan) => sum + plan.revenue, 0);
    const mostPopularPlan = revenueData.reduce((max, plan) => 
      plan.subscribers > max.subscribers ? plan : max
    );

    setAnalytics({
      totalPlans,
      averagePrice: Math.round(averagePrice),
      totalRevenue,
      mostPopularPlan
    });
  };

  // Mock data for charts
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 }
  ];

  const planDistributionData = plans.map(plan => ({
    name: plan.name,
    value: Math.floor(Math.random() * 100) + 10 // Mock subscriber count
  }));

  const priceRangeData = [
    { name: '0-500', value: plans.filter(p => p.price < 500).length },
    { name: '500-1000', value: plans.filter(p => p.price >= 500 && p.price < 1000).length },
    { name: '1000-2000', value: plans.filter(p => p.price >= 1000 && p.price < 2000).length },
    { name: '2000+', value: plans.filter(p => p.price >= 2000).length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Monitor your SMS service performance and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Data</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium">
            Export Report
          </button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Plans"
          value={analytics.totalPlans}
          icon="📋"
          color="blue"
          trend={{ direction: 'up', percentage: 12, period: 'vs last month' }}
        />
        <StatCard
          title="Average Price"
          value={`₹${analytics.averagePrice}`}
          icon="💰"
          color="green"
          trend={{ direction: 'up', percentage: 5, period: 'vs last month' }}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${analytics.totalRevenue.toLocaleString()}`}
          icon="📈"
          color="purple"
          trend={{ direction: 'up', percentage: 18, period: 'vs last month' }}
        />
        <StatCard
          title="Most Popular"
          value={analytics.mostPopularPlan?.name || 'N/A'}
          icon="⭐"
          color="yellow"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Revenue Trend (Last 6 Months)"
          data={revenueData}
          type="line"
          height={300}
        />
        <ChartCard
          title="Plan Distribution"
          data={planDistributionData}
          type="pie"
          height={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Price Range Distribution"
          data={priceRangeData}
          type="bar"
          height={300}
        />
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Plan Performance</h3>
            <p className="text-sm text-gray-600 mt-1">Individual plan metrics and subscriber data</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {plans.map((plan, index) => {
                const subscribers = Math.floor(Math.random() * 100) + 10;
                const revenue = Math.floor(Math.random() * 10000) + 1000;
                return (
                  <div key={plan.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {plan.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{plan.name}</p>
                        <p className="text-sm text-gray-600">₹{plan.price} • {plan.quota}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900">{subscribers}</p>
                          <p className="text-xs text-gray-600">subscribers</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600">₹{revenue.toLocaleString()}</p>
                          <p className="text-xs text-gray-600">revenue</p>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
