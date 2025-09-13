import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useSubscription } from '../../contexts/SubscriptionContext.jsx';
import { PLAN_TYPES } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import { indianSubscriptionAnalytics } from '../../data/indianBroadbandPlans';

const AdminDashboard = () => {
  const { plans, subscriptions } = useSubscription();

  // Use Indian analytics data
  const analyticsData = {
    totalPlans: indianSubscriptionAnalytics.totalPlans,
    activePlans: indianSubscriptionAnalytics.activePlans,
    totalSubscriptions: indianSubscriptionAnalytics.totalSubscriptions,
    activeSubscriptions: indianSubscriptionAnalytics.activeSubscriptions,
    monthlyRevenue: indianSubscriptionAnalytics.monthlyRevenue,
    revenueGrowth: indianSubscriptionAnalytics.revenueGrowth,
    subscriptionGrowth: indianSubscriptionAnalytics.subscriptionGrowth,
  };

  // Use Indian popular plans data
  const popularPlansData = indianSubscriptionAnalytics.popularPlans;

  // Use Indian subscription status data
  const subscriptionStatusData = indianSubscriptionAnalytics.subscriptionStatus;

  // Use Indian monthly trends data
  const monthlyTrendsData = indianSubscriptionAnalytics.monthlyTrends;

  // Use Indian plan type distribution data
  const planTypeData = indianSubscriptionAnalytics.planTypeDistribution;

  const StatCard = ({ title, value, icon: Icon, change, changeType, color = 'blue' }) => {
    const colorClasses = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100',
    };

    return (
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className={`flex items-center mt-1 text-sm ${
                changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'positive' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {change}%
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of subscription management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Plans"
          value={analyticsData.totalPlans}
          icon={Package}
          change={analyticsData.subscriptionGrowth}
          changeType="positive"
          color="blue"
        />
        <StatCard
          title="Active Subscriptions"
          value={analyticsData.activeSubscriptions}
          icon={Users}
          change={analyticsData.subscriptionGrowth}
          changeType="positive"
          color="green"
        />
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(analyticsData.monthlyRevenue)}
          icon={DollarSign}
          change={analyticsData.revenueGrowth}
          changeType="positive"
          color="purple"
        />
        <StatCard
          title="Active Plans"
          value={analyticsData.activePlans}
          icon={Activity}
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Popular Plans Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Plans</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularPlansData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="subscriptions" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription Status Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subscriptionStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {subscriptionStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Subscription Trends */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Subscription Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="subscriptions" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trends */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Plan Type Distribution */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Type Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={planTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            {planTypeData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="ml-auto text-sm text-gray-500">{item.value} plans</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
