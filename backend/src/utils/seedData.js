const memoryDB = require('./memoryDB');

const plans = [
  {
    name: 'Fiber Basic 50',
    type: 'Fibernet',
    monthlyQuota: 50,
    price: 399,
    features: [
      '50 GB high-speed data',
      'Up to 100 Mbps speed',
      '24/7 customer support',
      'Free installation',
      'WiFi router included'
    ],
    provider: 'BSNL Fiber',
    speed: '100 Mbps',
    isActive: true
  },
  {
    name: 'Fiber Unlimited 100',
    type: 'Fibernet',
    monthlyQuota: 100,
    price: 599,
    features: [
      '100 GB high-speed data',
      'Up to 150 Mbps speed',
      'Priority customer support',
      'Free installation',
      'Advanced WiFi router',
      'OTT platform access'
    ],
    provider: 'Airtel Fiber',
    speed: '150 Mbps',
    isActive: true
  },
  {
    name: 'Fiber Unlimited 200',
    type: 'Fibernet',
    monthlyQuota: 200,
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
    provider: 'Jio Fiber',
    speed: '200 Mbps',
    isActive: true
  },
  {
    name: 'Fiber Unlimited 500',
    type: 'Fibernet',
    monthlyQuota: 500,
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
    provider: 'Tata Play Fiber',
    speed: '300 Mbps',
    isActive: true
  },
  {
    name: 'Fiber Unlimited 1000',
    type: 'Fibernet',
    monthlyQuota: 1000,
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
    provider: 'ACT Fibernet',
    speed: '500 Mbps',
    isActive: true
  },
  {
    name: 'Broadband Basic 20',
    type: 'Broadband Copper',
    monthlyQuota: 20,
    price: 299,
    features: [
      '20 GB data allowance',
      'Up to 50 Mbps speed',
      'Basic customer support',
      'Standard installation',
      'Basic WiFi router'
    ],
    provider: 'BSNL Broadband',
    speed: '50 Mbps',
    isActive: true
  },
  {
    name: 'Broadband Standard 40',
    type: 'Broadband Copper',
    monthlyQuota: 40,
    price: 449,
    features: [
      '40 GB data allowance',
      'Up to 80 Mbps speed',
      'Standard customer support',
      'Free installation',
      'Enhanced WiFi router',
      'Email support'
    ],
    provider: 'MTNL Broadband',
    speed: '80 Mbps',
    isActive: true
  },
  {
    name: 'Broadband Premium 80',
    type: 'Broadband Copper',
    monthlyQuota: 80,
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
    provider: 'Hathway Broadband',
    speed: '100 Mbps',
    isActive: true
  },
  {
    name: 'Broadband Unlimited 150',
    type: 'Broadband Copper',
    monthlyQuota: 150,
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
    provider: 'Excitel Broadband',
    speed: '150 Mbps',
    isActive: true
  },
  {
    name: 'Student Special 30',
    type: 'Fibernet',
    monthlyQuota: 30,
    price: 249,
    features: [
      '30 GB high-speed data',
      'Up to 100 Mbps speed',
      'Student discount pricing',
      'Educational content access',
      'Basic customer support',
      'Free installation'
    ],
    provider: 'BSNL Fiber',
    speed: '100 Mbps',
    isActive: true,
    isSpecial: true
  },
  {
    name: 'Senior Citizen 25',
    type: 'Broadband Copper',
    monthlyQuota: 25,
    price: 199,
    features: [
      '25 GB data allowance',
      'Up to 50 Mbps speed',
      'Senior citizen discount',
      'Simplified billing',
      'Dedicated helpline',
      'Free installation'
    ],
    provider: 'BSNL Broadband',
    speed: '50 Mbps',
    isActive: true,
    isSpecial: true
  }
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@lumen.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Test User',
    email: 'user@lumen.com',
    password: 'user123',
    role: 'user'
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    memoryDB.data.plans = [];
    memoryDB.data.users = [];
    memoryDB.data.subscriptions = [];
    memoryDB.counters.plans = 0;
    memoryDB.counters.users = 0;
    memoryDB.counters.subscriptions = 0;

    // Insert plans
    plans.forEach(plan => {
      memoryDB.create('plans', plan);
    });
    console.log(`✅ Seeded ${plans.length} plans`);

    // Insert users
    users.forEach(user => {
      memoryDB.create('users', user);
    });
    console.log(`✅ Seeded ${users.length} users`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📋 Default Login Credentials:');
    console.log('Admin: admin@lumen.com / admin123');
    console.log('User: user@lumen.com / user123');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

module.exports = { seedDatabase, plans, users };
