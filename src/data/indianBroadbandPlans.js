// Indian Broadband Subscription Plans Dataset
// Based on real Indian ISP pricing and plans

export const indianBroadbandPlans = [
  // Fibernet Plans (High-speed fiber optic)
  {
    id: 'fiber-basic-50',
    name: 'Fiber Basic 50',
    type: 'Fibernet',
    monthlyQuota: 50, // GB
    price: 399, // INR
    features: [
      '50 GB high-speed data',
      'Up to 100 Mbps speed',
      '24/7 customer support',
      'Free installation',
      'WiFi router included'
    ],
    isActive: true,
    provider: 'BSNL Fiber',
    speed: '100 Mbps'
  },
  {
    id: 'fiber-unlimited-100',
    name: 'Fiber Unlimited 100',
    type: 'Fibernet',
    monthlyQuota: 100, // GB
    price: 599,
    features: [
      '100 GB high-speed data',
      'Up to 150 Mbps speed',
      'Priority customer support',
      'Free installation',
      'Advanced WiFi router',
      'OTT platform access'
    ],
    isActive: true,
    provider: 'Airtel Fiber',
    speed: '150 Mbps'
  },
  {
    id: 'fiber-unlimited-200',
    name: 'Fiber Unlimited 200',
    type: 'Fibernet',
    monthlyQuota: 200, // GB
    price: 799,
    features: [
      '200 GB high-speed data',
      'Up to 200 Mbps speed',
      'Premium customer support',
      'Free installation',
      'Smart WiFi router',
      'Multiple OTT platforms',
      'Parental controls'
    ],
    isActive: true,
    provider: 'Jio Fiber',
    speed: '200 Mbps'
  },
  {
    id: 'fiber-unlimited-500',
    name: 'Fiber Unlimited 500',
    type: 'Fibernet',
    monthlyQuota: 500, // GB
    price: 1299,
    features: [
      '500 GB high-speed data',
      'Up to 300 Mbps speed',
      'VIP customer support',
      'Free installation',
      'Gaming router included',
      'All OTT platforms',
      'Advanced security features',
      'Cloud storage (100 GB)'
    ],
    isActive: true,
    provider: 'Tata Play Fiber',
    speed: '300 Mbps'
  },
  {
    id: 'fiber-unlimited-1000',
    name: 'Fiber Unlimited 1000',
    type: 'Fibernet',
    monthlyQuota: 1000, // GB
    price: 1999,
    features: [
      '1000 GB high-speed data',
      'Up to 500 Mbps speed',
      'Dedicated account manager',
      'Free installation',
      'Professional WiFi router',
      'All premium OTT platforms',
      'Enterprise-grade security',
      'Cloud storage (500 GB)',
      'Static IP address'
    ],
    isActive: true,
    provider: 'ACT Fibernet',
    speed: '500 Mbps'
  },

  // Broadband Copper Plans (Traditional DSL)
  {
    id: 'broadband-basic-20',
    name: 'Broadband Basic 20',
    type: 'Broadband Copper',
    monthlyQuota: 20, // GB
    price: 299,
    features: [
      '20 GB data allowance',
      'Up to 50 Mbps speed',
      'Basic customer support',
      'Standard installation',
      'Basic WiFi router'
    ],
    isActive: true,
    provider: 'BSNL Broadband',
    speed: '50 Mbps'
  },
  {
    id: 'broadband-standard-40',
    name: 'Broadband Standard 40',
    type: 'Broadband Copper',
    monthlyQuota: 40, // GB
    price: 449,
    features: [
      '40 GB data allowance',
      'Up to 80 Mbps speed',
      'Standard customer support',
      'Free installation',
      'Enhanced WiFi router',
      'Email support'
    ],
    isActive: true,
    provider: 'MTNL Broadband',
    speed: '80 Mbps'
  },
  {
    id: 'broadband-premium-80',
    name: 'Broadband Premium 80',
    type: 'Broadband Copper',
    monthlyQuota: 80, // GB
    price: 649,
    features: [
      '80 GB data allowance',
      'Up to 100 Mbps speed',
      'Priority customer support',
      'Free installation',
      'Advanced WiFi router',
      'OTT platform access',
      'Parental controls'
    ],
    isActive: true,
    provider: 'Hathway Broadband',
    speed: '100 Mbps'
  },
  {
    id: 'broadband-unlimited-150',
    name: 'Broadband Unlimited 150',
    type: 'Broadband Copper',
    monthlyQuota: 150, // GB
    price: 899,
    features: [
      '150 GB data allowance',
      'Up to 150 Mbps speed',
      'Premium customer support',
      'Free installation',
      'Smart WiFi router',
      'Multiple OTT platforms',
      'Advanced security',
      'Cloud backup'
    ],
    isActive: true,
    provider: 'Excitel Broadband',
    speed: '150 Mbps'
  },

  // Special Plans
  {
    id: 'student-plan-30',
    name: 'Student Special 30',
    type: 'Fibernet',
    monthlyQuota: 30, // GB
    price: 249,
    features: [
      '30 GB high-speed data',
      'Up to 100 Mbps speed',
      'Student discount pricing',
      'Educational content access',
      'Basic customer support',
      'Free installation'
    ],
    isActive: true,
    provider: 'BSNL Fiber',
    speed: '100 Mbps',
    isSpecial: true
  },
  {
    id: 'senior-citizen-25',
    name: 'Senior Citizen 25',
    type: 'Broadband Copper',
    monthlyQuota: 25, // GB
    price: 199,
    features: [
      '25 GB data allowance',
      'Up to 50 Mbps speed',
      'Senior citizen discount',
      'Simplified billing',
      'Dedicated helpline',
      'Free installation'
    ],
    isActive: true,
    provider: 'BSNL Broadband',
    speed: '50 Mbps',
    isSpecial: true
  }
];

// Indian subscription analytics data
export const indianSubscriptionAnalytics = {
  totalPlans: indianBroadbandPlans.length,
  activePlans: indianBroadbandPlans.filter(p => p.isActive).length,
  totalSubscriptions: 1250, // Mock total subscriptions
  activeSubscriptions: 980, // Mock active subscriptions
  monthlyRevenue: 1250000, // INR - Mock monthly revenue
  revenueGrowth: 15.2, // Percentage growth
  subscriptionGrowth: 12.8, // Percentage growth
  
  // Popular plans data
  popularPlans: [
    { name: 'Fiber Unlimited 100', subscriptions: 245, revenue: 146755 },
    { name: 'Fiber Unlimited 200', subscriptions: 189, revenue: 151011 },
    { name: 'Broadband Premium 80', subscriptions: 156, revenue: 101244 },
    { name: 'Fiber Basic 50', subscriptions: 134, revenue: 53466 },
    { name: 'Broadband Standard 40', subscriptions: 98, revenue: 44002 }
  ],
  
  // Subscription status distribution
  subscriptionStatus: [
    { name: 'Active', value: 980, color: '#10b981' },
    { name: 'Cancelled', value: 180, color: '#ef4444' },
    { name: 'Expired', value: 90, color: '#6b7280' }
  ],
  
  // Monthly trends (last 6 months)
  monthlyTrends: [
    { month: 'Aug', subscriptions: 45, revenue: 125000 },
    { month: 'Sep', subscriptions: 52, revenue: 145000 },
    { month: 'Oct', subscriptions: 48, revenue: 135000 },
    { month: 'Nov', subscriptions: 61, revenue: 165000 },
    { month: 'Dec', subscriptions: 58, revenue: 155000 },
    { month: 'Jan', subscriptions: 67, revenue: 185000 }
  ],
  
  // Plan type distribution
  planTypeDistribution: [
    { name: 'Fibernet', value: 65, color: '#3b82f6' },
    { name: 'Broadband Copper', value: 35, color: '#10b981' }
  ],
  
  // Revenue by plan type
  revenueByType: [
    { name: 'Fibernet', revenue: 850000, percentage: 68 },
    { name: 'Broadband Copper', revenue: 400000, percentage: 32 }
  ]
};

// Indian cities and regions
export const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
  'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi'
];

// Indian states
export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];
