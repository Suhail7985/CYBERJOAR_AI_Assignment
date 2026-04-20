import React, { useState, useEffect } from 'react';
import MainDashboard from './pages/MainDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing'); // 'landing', 'login', 'signup', 'dashboard'
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
    setView('landing'); 
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
    </div>
  );

  if (view === 'landing') {
    return (
      <LandingPage 
        user={user} 
        onGetStarted={() => setView(user ? 'dashboard' : 'login')} 
      />
    );
  }

  if (view === 'signup') {
    return (
      <SignupPage 
        onSignupSuccess={(user) => {
          setUser(user);
          setView('dashboard');
        }}
        onSwitchToLogin={() => setView('login')}
      />
    );
  }

  if (view === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={(user) => {
          setUser(user);
          setView('dashboard');
        }}
        onSwitchToSignup={() => setView('signup')}
      />
    );
  }

  // Final Guard: If view is dashboard but no user exists, fallback to landing
  if (!user) {
    return (
      <LandingPage 
        user={null} 
        onGetStarted={() => setView('login')} 
      />
    );
  }

  return (
    <div className="App w-full h-full">
      <MainDashboard user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;
