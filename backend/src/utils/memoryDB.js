// Simple in-memory database for demo purposes
class MemoryDB {
  constructor() {
    this.data = {
      users: [],
      plans: [],
      subscriptions: []
    };
    this.counters = {
      users: 0,
      plans: 0,
      subscriptions: 0
    };
  }

  // Generic methods
  create(collection, data) {
    const id = (++this.counters[collection]).toString();
    const item = {
      _id: id,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data[collection].push(item);
    return item;
  }

  findById(collection, id) {
    return this.data[collection].find(item => item._id === id);
  }

  find(collection, filter = {}) {
    let results = this.data[collection];
    
    // Apply filters
    Object.keys(filter).forEach(key => {
      if (filter[key] !== undefined) {
        if (key === 'isActive' && typeof filter[key] === 'string') {
          filter[key] = filter[key] === 'true';
        }
        results = results.filter(item => {
          if (key === 'provider' && typeof filter[key] === 'string') {
            return item[key] && item[key].toLowerCase().includes(filter[key].toLowerCase());
          }
          return item[key] === filter[key];
        });
      }
    });
    
    return results;
  }

  findOne(collection, filter) {
    const results = this.find(collection, filter);
    return results.length > 0 ? results[0] : null;
  }

  update(collection, id, data) {
    const index = this.data[collection].findIndex(item => item._id === id);
    if (index === -1) return null;
    
    this.data[collection][index] = {
      ...this.data[collection][index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    return this.data[collection][index];
  }

  delete(collection, id) {
    const index = this.data[collection].findIndex(item => item._id === id);
    if (index === -1) return null;
    
    return this.data[collection].splice(index, 1)[0];
  }

  count(collection, filter = {}) {
    return this.find(collection, filter).length;
  }

  // User specific methods
  findUserByEmail(email) {
    return this.data.users.find(user => user.email === email);
  }

  // Subscription specific methods
  findActiveSubscriptionByUser(userId) {
    return this.data.subscriptions.find(sub => 
      sub.user === userId && sub.status === 'active'
    );
  }

  findSubscriptionsByUser(userId) {
    return this.data.subscriptions.filter(sub => sub.user === userId);
  }

  // Plan specific methods
  findActivePlans() {
    return this.data.plans.filter(plan => plan.isActive);
  }

  // Statistics methods
  getStats() {
    return {
      totalUsers: this.data.users.length,
      activeUsers: this.data.users.filter(u => u.isActive).length,
      totalPlans: this.data.plans.length,
      activePlans: this.data.plans.filter(p => p.isActive).length,
      totalSubscriptions: this.data.subscriptions.length,
      activeSubscriptions: this.data.subscriptions.filter(s => s.status === 'active').length
    };
  }
}

// Create singleton instance
const memoryDB = new MemoryDB();

module.exports = memoryDB;
