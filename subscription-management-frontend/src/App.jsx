import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { SubscriptionProvider } from './contexts/SubscriptionContext.jsx';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Navbar from './components/shared/Navbar';
import Login from './pages/Login';
import { USER_ROLES, ROUTES } from './utils/constants';

// Import pages (we'll create these next)
import AdminDashboard from './pages/admin/AdminDashboard';
import PlansManagement from './pages/admin/PlansManagement';
import UserDashboard from './pages/user/UserDashboard';
import PlanBrowser from './pages/user/PlanBrowser';
import CurrentSubscription from './pages/user/CurrentSubscription';
import UPITest from './components/payment/UPITest';

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/test-upi" element={<UPITest />} />
              <Route path="/test-plans" element={<PlanBrowser />} />
              
              {/* Protected admin routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                    <Navbar />
                    <Routes>
                      <Route path="/dashboard" element={<AdminDashboard />} />
                      <Route path="/plans" element={<PlansManagement />} />
                      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
              
              {/* Protected user routes */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute requiredRole={USER_ROLES.USER}>
                    <Navbar />
                    <Routes>
                      <Route path="/dashboard" element={<UserDashboard />} />
                      <Route path="/plans" element={<PlanBrowser />} />
                      <Route path="/subscription/current" element={<CurrentSubscription />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;
