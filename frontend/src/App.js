import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreatorDashboard from './components/dashboard/CreatorDashboard';
import BrandDashboard from './components/dashboard/BrandDashboard';
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Check for existing session
    const token = sessionStorage.getItem('token');
    const userData = sessionStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e, isLogin) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      social: formData.get('social')
    };

    try {
      const response = await fetch(`http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Authentication failed');
      }

      // Store user data and token
      sessionStorage.setItem('token', result.token);
      sessionStorage.setItem('user', JSON.stringify(result.user));
      
      if (!isLogin) {
        // Show success message for registration
        setSuccessMessage(`Account created successfully! You can now log in as a ${result.user.role}.`);
        // Clear form data
        e.target.reset();
        // Don't set user state yet - they need to log in
        return;
      }
      
      // For login, set user state which will trigger redirection
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  const handleSuccessMessageClose = () => {
    setSuccessMessage(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {successMessage && (
        <div className="success-modal">
          <div className="success-content">
            <p>{successMessage}</p>
            <button onClick={handleSuccessMessageClose}>OK</button>
          </div>
        </div>
      )}
      <Routes>
        <Route 
          path="/" 
          element={
            user ? (
              <Navigate to={user.role === 'creator' ? '/creator-dashboard' : '/brand-dashboard'} />
            ) : (
              <LandingPage 
                onSubmit={handleSubmit}
                error={error}
                loading={loading}
              />
            )
          } 
        />
        <Route 
          path="/creator-dashboard" 
          element={
            user && user.role === 'creator' ? (
              <CreatorDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route 
          path="/brand-dashboard" 
          element={
            user && user.role === 'brand' ? (
              <BrandDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
































