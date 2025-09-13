import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { SubscriptionPlan } from "@/pages/Index";

interface AnalyticsProps {
  plans: SubscriptionPlan[];
}

export const Analytics = ({ plans }: AnalyticsProps) => {
  const analytics = useMemo(() => {
    const totalPlans = plans.length;
    const totalRevenue = plans.reduce((sum, plan) => sum + plan.price, 0);
    const avgPrice = totalPlans > 0 ? totalRevenue / totalPlans : 0;
    
    // Plan distribution by price range
    const priceRanges = [
      { range: '₹0-500', min: 0, max: 500, color: '#8b5cf6' },
      { range: '₹500-1000', min: 500, max: 1000, color: '#a855f7' },
      { range: '₹1000-2000', min: 1000, max: 2000, color: '#c084fc' },
      { range: '₹2000+', min: 2000, max: Infinity, color: '#d8b4fe' },
    ];

    const plansByPriceRange = priceRanges.map(range => ({
      name: range.range,
      count: plans.filter(plan => plan.price >= range.min && plan.price < range.max).length,
      fill: range.color
    }));

    // Plan data for bar chart
    const planData = plans.map(plan => ({
      name: plan.name.length > 12 ? plan.name.substring(0, 12) + '...' : plan.name,
      price: plan.price,
      validity: plan.validityDays
    }));

    // Validity distribution
    const validityRanges = [
      { range: '1-30 days', min: 1, max: 30 },
      { range: '31-90 days', min: 31, max: 90 },
      { range: '91-365 days', min: 91, max: 365 },
      { range: '365+ days', min: 365, max: Infinity },
    ];

    const plansByValidity = validityRanges.map(range => ({
      name: range.range,
      count: plans.filter(plan => plan.validityDays >= range.min && plan.validityDays <= range.max).length
    }));

    return {
      totalPlans,
      totalRevenue,
      avgPrice,
      plansByPriceRange,
      planData,
      plansByValidity
    };
  }, [plans]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const StatCard = ({ title, value, description, trend }: { 
    title: string; 
    value: string; 
    description: string; 
    trend?: 'up' | 'down' | 'neutral';
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trend && (
          <Badge variant={trend === 'up' ? 'default' : trend === 'down' ? 'destructive' : 'secondary'}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  if (plans.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-48">
          <p className="text-muted-foreground text-lg mb-4">No data available</p>
          <p className="text-sm text-muted-foreground">Create some subscription plans to see analytics</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Track your subscription metrics and performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Plans"
          value={analytics.totalPlans.toString()}
          description="Active subscription plans"
          trend="neutral"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(analytics.totalRevenue)}
          description="Combined plan values"
          trend="up"
        />
        <StatCard
          title="Average Price"
          value={formatCurrency(analytics.avgPrice)}
          description="Mean plan pricing"
          trend="neutral"
        />
        <StatCard
          title="Plans Created"
          value={analytics.totalPlans.toString()}
          description="This month"
          trend="up"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Price Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Pricing</CardTitle>
            <CardDescription>Revenue breakdown by subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.planData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any, name: any) => [
                    name === 'price' ? formatCurrency(Number(value)) : value,
                    name === 'price' ? 'Price' : 'Validity (days)'
                  ]}
                />
                <Bar dataKey="price" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Price Range Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Price Range Distribution</CardTitle>
            <CardDescription>Plans grouped by pricing tiers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.plansByPriceRange}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.plansByPriceRange.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Validity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Validity Distribution</CardTitle>
          <CardDescription>Number of plans by validity period</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.plansByValidity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Plan Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Overview</CardTitle>
          <CardDescription>Detailed view of all subscription plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Plan Name</th>
                  <th className="text-left p-2 font-medium">Price</th>
                  <th className="text-left p-2 font-medium">Features</th>
                  <th className="text-left p-2 font-medium">Validity</th>
                  <th className="text-left p-2 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id} className="border-b last:border-b-0">
                    <td className="p-2 font-medium">{plan.name}</td>
                    <td className="p-2">{formatCurrency(plan.price)}</td>
                    <td className="p-2">{plan.features}</td>
                    <td className="p-2">{plan.validityDays} days</td>
                    <td className="p-2">{plan.createdAt.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};