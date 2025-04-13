// src/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Send login request to the backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // If login is successful, save token to localStorage
        localStorage.setItem('token', result.token);

        // Redirect to the appropriate Dashboard page after login
        const userRole = result.user.role; // Assuming the role is returned as part of the user object
        if (userRole === 'creator') {
          window.location.href = '/creator-dashboard'; // Redirect to creator dashboard
        } else if (userRole === 'brand') {
          window.location.href = '/brand-dashboard'; // Redirect to brand dashboard
        } else {
          // If for some reason the user role is not set correctly, you could redirect them to a default route
          window.location.href = '/';
        }
      } else {
        // Show error message if login fails
        setErrorMessage(result.message);
      }
    } catch (error) {
      // Catch and display any unexpected errors
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

