import React, { useState } from 'react';
import './Dashboard.css';

const BrandDashboard = () => {
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
            <h3>Active Listings</h3>
            <p>3</p>
          </div>
          <div className="stat-card">
            <h3>Total Applications</h3>
            <p>24</p>
          </div>
          <div className="stat-card">
            <h3>Profile Views</h3>
            <p>856</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'opportunities' ? 'active' : ''}`}
          onClick={() => setActiveTab('opportunities')}
        >
          Create Opportunity
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
          Brand Profile
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'opportunities' && (
          <div className="opportunities-section">
            <h2>Create New Opportunity</h2>
            <form className="opportunity-form">
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="e.g., Tech Review Content Creator" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Describe the opportunity and requirements..." />
              </div>
              <div className="form-group">
                <label>Budget Range</label>
                <div className="budget-inputs">
                  <input type="number" placeholder="Min" />
                  <span>to</span>
                  <input type="number" placeholder="Max" />
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select>
                  <option value="">Select Category</option>
                  <option value="tech">Technology</option>
                  <option value="fashion">Fashion</option>
                  <option value="lifestyle">Lifestyle</option>
                </select>
              </div>
              <div className="form-group">
                <label>Platform</label>
                <select>
                  <option value="">Select Platform</option>
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>
              <button type="submit" className="submit-button">Create Opportunity</button>
            </form>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-section">
            <h2>Applications</h2>
            <div className="applications-list">
              <div className="application-item">
                <div className="application-info">
                  <h3>John Doe</h3>
                  <p>Applied for: Tech Review Content Creator</p>
                  <p>Followers: 15k</p>
                  <p>Engagement Rate: 4.5%</p>
                </div>
                <div className="application-actions">
                  <button className="view-button">View Profile</button>
                  <button className="accept-button">Accept</button>
                  <button className="reject-button">Reject</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'creators' && (
          <div className="creators-section">
            <h2>Find Creators</h2>
            <div className="search-filters">
              <input type="text" placeholder="Search creators..." className="search-input" />
              <select className="filter-select">
                <option value="">All Categories</option>
                <option value="tech">Technology</option>
                <option value="fashion">Fashion</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
              <select className="filter-select">
                <option value="">All Platforms</option>
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
            <div className="creators-grid">
              <div className="creator-card">
                <div className="creator-header">
                  <div className="creator-avatar">JD</div>
                  <div className="creator-info">
                    <h3>John Doe</h3>
                    <p>Tech Reviewer</p>
                  </div>
                </div>
                <div className="creator-stats">
                  <div className="stat">
                    <span>15k</span>
                    <label>Followers</label>
                  </div>
                  <div className="stat">
                    <span>4.5%</span>
                    <label>Engagement</label>
                  </div>
                </div>
                <p className="creator-bio">Tech enthusiast creating in-depth reviews and tutorials</p>
                <div className="creator-actions">
                  <button className="view-button">View Profile</button>
                  <button className="message-button">Message</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Brand Profile</h2>
            <div className="profile-content">
              <div className="profile-header">
                <div className="profile-avatar">
                  {/* Add brand logo or placeholder */}
                </div>
                <div className="profile-info">
                  <h3>Brand Name</h3>
                  <p>@brandhandle</p>
                </div>
              </div>
              <div className="profile-stats">
                <div className="stat">
                  <h4>Active Campaigns</h4>
                  <p>3</p>
                </div>
                <div className="stat">
                  <h4>Total Spent</h4>
                  <p>$15,000</p>
                </div>
                <div className="stat">
                  <h4>Industry</h4>
                  <p>Technology</p>
                </div>
              </div>
              <button className="edit-profile-button">Edit Profile</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDashboard; 