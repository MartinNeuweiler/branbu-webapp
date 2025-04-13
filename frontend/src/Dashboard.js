import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data from the backend
      fetch('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Sending the token as Authorization header
        },
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => {
          console.error('Error fetching user data:', err);
        });
    } else {
      window.location.href = '/login'; // Redirect to login if not authenticated
    }
  }, []); // Empty array ensures it only runs once after component mounts

  if (!user) return <div>Loading...</div>; // Show loading until user data is fetched

  return (
    <div>
      <h1>Welcome to your Dashboard, {user.email}</h1>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Social:</strong> {user.social}</p>
    </div>
  );
};

export default Dashboard;
