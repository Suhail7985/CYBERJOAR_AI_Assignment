import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FusionDashboard from './pages/FusionDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import DashboardHome from './pages/DashboardHome';
import UrbanGrowth from './pages/UrbanGrowth';
import Reports from './pages/Reports';
import Export from './pages/Export';
import MainLayout from './components/Layout/MainLayout';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (savedUser && token) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Failed to load session:', err);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
    </div>
  );

  return (
    <Router>
      <div className="App w-full h-full">
        <Routes>
          {/* Public Routes */}
          <Route path="/landing" element={
            user ? <Navigate to="/" /> : <LandingPage user={null} onGetStarted={() => {}} />
          } />
          <Route path="/login" element={
            user ? <Navigate to="/" /> : <LoginPage onLoginSuccess={setUser} onSwitchToSignup={() => {}} />
          } />
          <Route path="/signup" element={
            user ? <Navigate to="/" /> : <SignupPage onSignupSuccess={setUser} onSwitchToLogin={() => {}} />
          } />

          {/* Protected Routes (Wrapped in MainLayout) */}
          <Route path="/" element={
            user ? (
              <MainLayout user={user} onLogout={handleLogout}>
                <DashboardHome user={user} />
              </MainLayout>
            ) : <Navigate to="/landing" />
          } />
          
          <Route path="/fusion-dashboard" element={
            user ? (
              <MainLayout user={user} onLogout={handleLogout}>
                <FusionDashboard user={user} onLogout={handleLogout} />
              </MainLayout>
            ) : <Navigate to="/landing" />
          } />

          <Route path="/urban-growth" element={
            user ? (
              <MainLayout user={user} onLogout={handleLogout}>
                <UrbanGrowth user={user} />
              </MainLayout>
            ) : <Navigate to="/landing" />
          } />

          <Route path="/reports" element={
            user ? (
              <MainLayout user={user} onLogout={handleLogout}>
                <Reports user={user} />
              </MainLayout>
            ) : <Navigate to="/landing" />
          } />

          <Route path="/export" element={
            user ? (
              <MainLayout user={user} onLogout={handleLogout}>
                <Export user={user} />
              </MainLayout>
            ) : <Navigate to="/landing" />
          } />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
