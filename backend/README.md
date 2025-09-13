# Subscription Management Backend

A robust Node.js backend API for managing broadband subscription plans and user subscriptions.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Plan Management**: CRUD operations for subscription plans
- **Subscription Management**: Subscribe, cancel, renew subscriptions
- **Usage Tracking**: Monitor data usage and subscription status
- **Admin Dashboard**: Administrative functions for managing users and plans
- **Security**: Rate limiting, CORS, helmet security headers
- **Database**: MongoDB with Mongoose ODM

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd subscription-management-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   MONGODB_URI=mongodb://localhost:27017/subscription-management
   API_VERSION=v1
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Plans
- `GET /api/plans` - Get all plans
- `GET /api/plans/:id` - Get single plan
- `POST /api/plans` - Create plan (Admin only)
- `PUT /api/plans/:id` - Update plan (Admin only)
- `DELETE /api/plans/:id` - Delete plan (Admin only)
- `GET /api/plans/stats/overview` - Get plan statistics (Admin only)

### Subscriptions
- `GET /api/subscriptions/current` - Get current subscription
- `GET /api/subscriptions/history` - Get subscription history
- `POST /api/subscriptions/subscribe` - Subscribe to plan
- `PUT /api/subscriptions/cancel` - Cancel subscription
- `PUT /api/subscriptions/renew` - Renew subscription
- `PUT /api/subscriptions/usage` - Update usage data

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id/status` - Update user status
- `GET /api/users/stats/overview` - Get user statistics

## 🔐 Default Credentials

The database is automatically seeded with default users:

- **Admin**: `admin@lumen.com` / `admin123`
- **User**: `user@lumen.com` / `user123`

## 🗄️ Database Models

### Plan
- name, type, monthlyQuota, price
- features, provider, speed
- isActive, isSpecial

### User
- name, email, password
- role (user/admin), avatar
- isActive, lastLogin

### Subscription
- user, plan, status
- startDate, endDate, autoRenew
- usageData, paymentHistory

## 🔧 Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

### Project Structure
```
src/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
└── server.js        # Main server file
```

## 🚀 Deployment

1. Set production environment variables
2. Install dependencies: `npm install --production`
3. Start server: `npm start`

## 📝 License

MIT License
