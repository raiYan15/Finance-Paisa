import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Suspense, lazy } from 'react';

// Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const LoanApplication = lazy(() => import('./pages/LoanApplication'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PartnerWithUs = lazy(() => import('./pages/PartnerWithUs'));
const ContactEnquiries = lazy(() => import('./pages/ContactEnquiries'));
const Services = lazy(() => import('./pages/Services'));

// Loading spinner
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-color)' }}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-600 dark:border-blue-400/30 dark:border-t-blue-400 rounded-full animate-spin" />
      <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Loading Finance Paisa...</p>
    </div>
  </div>
);

// Protected route
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

// Public only route (redirect if logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated) return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  return children;
};

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/apply" element={<LoanApplication />} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
        <Route path="/services" element={<Services />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/contact" element={<ContactEnquiries />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
