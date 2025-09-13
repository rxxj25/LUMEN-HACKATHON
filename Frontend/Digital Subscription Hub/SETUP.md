# Sunstone Login App - Backend Integration Setup

This guide will help you set up the Sunstone Login App with Node.js backend integration.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the backend directory:
```bash
cp env.example .env
```

Edit the `.env` file with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### 4. Start the Backend Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The backend server will start on `http://localhost:5000`

## Frontend Setup

### 1. Navigate to Root Directory
```bash
cd .. # (if you're in the backend directory)
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```bash
cp env.example .env
```

Edit the `.env` file:
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Sunstone Login App
VITE_APP_VERSION=1.0.0
```

### 4. Start the Frontend Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Testing the Integration

### 1. Demo Accounts
The backend comes with pre-configured demo accounts:

**Regular User:**
- **Email**: `demo@sunstone.com`
- **Password**: `password`

**Admin User:**
- **Email**: `admin@sunstone.com`
- **Password**: `password`

### 2. Test Login Flow
1. Open `http://localhost:5173`
2. Click "Sign In" in the navigation
3. Use the demo credentials to log in
4. You should be redirected to the dashboard

### 3. Test Admin Features
1. Log in with admin credentials (`admin@sunstone.com` / `password`)
2. You should see an "Admin Panel" button in the navigation
3. Click "Admin Panel" to access the admin dashboard
4. Test user management features

### 4. Test Registration
1. Go to the login page
2. Click "Sign up here" at the bottom
3. Fill in the registration form
4. You should be automatically logged in after registration

## API Endpoints

The backend provides the following endpoints:

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh JWT token

### Admin Endpoints (Admin only)
- `GET /api/admin/dashboard` - Get admin dashboard data
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user by ID
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user (soft delete)
- `GET /api/admin/stats` - Get detailed statistics

### System Endpoints
- `GET /api/health` - Health check

## Features Implemented

### Backend Features
- ✅ Express.js server with security middleware
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation with express-validator
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Error handling middleware
- ✅ In-memory user storage (demo purposes)

### Frontend Features
- ✅ React authentication context
- ✅ Protected routes and admin routes
- ✅ API service layer
- ✅ Login form with validation
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Automatic token management
- ✅ Comprehensive user dashboard with tabs
- ✅ Admin dashboard with user management
- ✅ Role-based access control
- ✅ User statistics and analytics

## Security Features

- JWT tokens with expiration
- Password hashing with bcrypt
- Rate limiting to prevent brute force attacks
- CORS protection
- Input validation and sanitization
- Secure headers with Helmet.js

## Development Notes

- The backend uses in-memory storage for demo purposes
- In production, you should integrate with a proper database (MongoDB, PostgreSQL, etc.)
- JWT secret should be changed to a secure random string in production
- Consider implementing refresh token rotation for enhanced security

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the `FRONTEND_URL` in backend `.env` matches your frontend URL
2. **Connection Refused**: Ensure the backend server is running on port 5000
3. **Token Issues**: Clear browser localStorage if you encounter authentication issues

### Logs
- Backend logs are displayed in the terminal where you started the server
- Frontend errors are shown in the browser console and toast notifications

## Next Steps

To extend this application, consider:
- Adding a proper database (MongoDB, PostgreSQL)
- Implementing password reset functionality
- Adding email verification
- Implementing role-based access control
- Adding more user profile fields
- Implementing subscription management features
