# Frontend-Only Authentication Setup

This setup allows you to test the login functionality without needing a backend server. All authentication is handled in the frontend with demo users.

## 🚀 Quick Start

### 1. Start Frontend Only
```bash
npm install
npm run dev
```

The frontend will start on `http://localhost:8080` (or another port if 8080 is busy).

### 2. Demo Login Credentials

**Regular Users:**
- **Email**: `demo@sunstone.com` | **Password**: `password`
- **Email**: `john@example.com` | **Password**: `password123`
- **Email**: `jane@example.com` | **Password**: `password123`

**Admin Users:**
- **Email**: `admin@sunstone.com` | **Password**: `password`
- **Email**: `manager@sunstone.com` | **Password**: `admin123`

## ✨ Features

### **Frontend-Only Authentication**
- ✅ No backend server required
- ✅ Demo users with different roles
- ✅ Local storage for session management
- ✅ JWT-like token system (frontend only)
- ✅ Automatic token expiration (24 hours)

### **User Dashboard**
- ✅ Comprehensive tabbed interface
- ✅ Usage analytics and statistics
- ✅ Billing information
- ✅ Account settings
- ✅ Real-time data visualization

### **Admin Dashboard**
- ✅ User management interface
- ✅ System analytics
- ✅ Role-based access control
- ✅ User statistics and monitoring

### **Security Features**
- ✅ Role-based route protection
- ✅ Token-based authentication
- ✅ Automatic logout on token expiration
- ✅ Secure password handling (demo only)

## 🎯 How to Test

### 1. **Login as Regular User**
1. Go to `http://localhost:8080`
2. Click "Sign In"
3. Use: `demo@sunstone.com` / `password`
4. Explore the user dashboard with all tabs

### 2. **Login as Admin**
1. Use: `admin@sunstone.com` / `password`
2. You'll see "Admin Panel" button in navigation
3. Access admin dashboard with user management

### 3. **Test Registration**
1. Go to login page
2. Click "Sign up here"
3. Create a new account
4. Automatically logged in after registration

## 📱 Demo Credentials Display

The homepage now includes a "Try It Out Now!" section that shows all available demo credentials with:
- Copy-to-clipboard functionality
- Role indicators (User/Admin)
- Quick start instructions

## 🔧 Technical Details

### **Authentication Flow**
1. User enters credentials
2. Frontend validates against demo users
3. Generates local JWT-like token
4. Stores in localStorage
5. Redirects to appropriate dashboard

### **Data Storage**
- All user data stored in browser localStorage
- Session persists across browser refreshes
- Automatic cleanup on token expiration

### **Role-Based Access**
- Regular users: Access to user dashboard only
- Admin users: Access to both user and admin dashboards
- Automatic redirects based on role

## 🎨 UI Features

- **Responsive Design**: Works on all device sizes
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success/error feedback
- **Modern UI**: Beautiful shadcn/ui components

## 🔄 Switching to Backend

To switch back to backend authentication:
1. Update `src/contexts/AuthContext.tsx` to use `apiService` instead of `frontendAuthService`
2. Start the backend server
3. Remove the demo credentials section from HomePage

## 📋 Available Demo Users

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| demo@sunstone.com | password | user | Main demo user |
| admin@sunstone.com | password | admin | Main admin user |
| john@example.com | password123 | user | Sample user |
| jane@example.com | password123 | user | Sample user |
| manager@sunstone.com | admin123 | admin | Manager admin |

## 🎉 Ready to Demo!

The application is now ready for demonstration without any backend setup. All features work exactly as they would with a real backend, but everything is handled in the frontend for easy testing and demonstration purposes.
