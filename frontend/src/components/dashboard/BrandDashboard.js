import React, { useState } from 'react';
// eslint-disable-next-line
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const BrandDashboard = () => {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('opportunities');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Brand Dashboard</h1>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Active Campaigns</h3>
            <p>3</p>
          </div>
          <div className="stat-card">
            <h3>Total Reach</h3>
            <p>2.5M</p>
          </div>
          <div className="stat-card">
            <h3>Applications</h3>
            <p>28</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'opportunities' ? 'active' : ''}`}
          onClick={() => setActiveTab('opportunities')}
        >
          Campaigns
        </button>
        <button 
          className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          Applications
        </button>
        <button 
          className={`tab ${activeTab === 'creators' ? 'active' : ''}`}
          onClick={() => setActiveTab('creators')}
        >
          Creators
        </button>
        <button 
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'opportunities' && (
          <div>
            <div className="opportunities-grid">
              <div className="opportunity-card">
                <h3 className="card-title">Summer Collection Launch</h3>
                <p className="card-subtitle">Active Campaign</p>
                <p className="card-content">Looking for lifestyle influencers...</p>
                <div className="card-stats">
                  <span>Applications: 12</span>
                  <span>Views: 245</span>
                </div>
                <button className="secondary-button">View Details</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-list">
            <div className="opportunity-card">
              <h3 className="card-title">John Smith</h3>
              <p className="card-subtitle">Applied for: Summer Collection Launch</p>
              <p className="card-content">Fitness influencer with 100k+ followers...</p>
              <div className="button-group">
                <button className="primary-button">Accept</button>
                <button className="secondary-button">Decline</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'creators' && (
          <div className="creators-grid">
            <div className="creator-card">
              <h3 className="card-title">Sarah Johnson</h3>
              <p className="card-subtitle">Fitness & Wellness</p>
              <p className="card-content">200K+ followers across platforms...</p>
              <button className="secondary-button">View Profile</button>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-avatar">NB</div>
              <div className="profile-info">
                <h3>Nike Brand</h3>
                <p>Sports & Fitness</p>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat">
                <h4>Active Campaigns</h4>
                <p>3</p>
              </div>
              <div className="stat">
                <h4>Total Reach</h4>
                <p>2.5M</p>
              </div>
              <div className="stat">
                <h4>Success Rate</h4>
                <p>92%</p>
              </div>
            </div>
            <button className="primary-button">Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDashboard; 