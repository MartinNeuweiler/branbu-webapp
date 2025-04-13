import React, { useState } from 'react';
import './Dashboard.css';

const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('opportunities');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Creator Dashboard</h1>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Active Applications</h3>
            <p>5</p>
          </div>
          <div className="stat-card">
            <h3>Total Earnings</h3>
            <p>$2,500</p>
          </div>
          <div className="stat-card">
            <h3>Profile Views</h3>
            <p>1,234</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'opportunities' ? 'active' : ''}`}
          onClick={() => setActiveTab('opportunities')}
        >
          Opportunities
        </button>
        <button 
          className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          My Applications
        </button>
        <button 
          className={`tab ${activeTab === 'brands' ? 'active' : ''}`}
          onClick={() => setActiveTab('brands')}
        >
          Brands
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
          <div className="opportunities-section">
            <h2>Recommended Opportunities</h2>
            <div className="opportunities-grid">
              <div className="opportunity-card">
                <h3>Tech Review Content Creator</h3>
                <p className="brand-name">TechCorp</p>
                <p className="budget">Budget: $500-$1000</p>
                <p className="description">Looking for tech reviewers to showcase our latest gadgets</p>
                <button className="apply-button">Apply Now</button>
              </div>
              <div className="opportunity-card">
                <h3>Fashion Influencer</h3>
                <p className="brand-name">StyleCo</p>
                <p className="budget">Budget: $800-$1500</p>
                <p className="description">Seeking fashion influencers for our summer collection</p>
                <button className="apply-button">Apply Now</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-section">
            <h2>My Applications</h2>
            <div className="applications-list">
              <div className="application-item">
                <div className="application-info">
                  <h3>Tech Review Content Creator</h3>
                  <p>Applied on: March 15, 2024</p>
                  <p>Status: Pending Review</p>
                </div>
                <div className="application-actions">
                  <button className="view-button">View Details</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'brands' && (
          <div className="brands-section">
            <h2>Discover Brands</h2>
            <div className="search-filters">
              <input type="text" placeholder="Search brands..." className="search-input" />
              <select className="filter-select">
                <option value="">All Industries</option>
                <option value="tech">Technology</option>
                <option value="fashion">Fashion</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
              <select className="filter-select">
                <option value="">All Campaign Types</option>
                <option value="review">Product Reviews</option>
                <option value="sponsored">Sponsored Content</option>
                <option value="ambassador">Brand Ambassador</option>
              </select>
            </div>
            <div className="brands-grid">
              <div className="brand-card">
                <div className="brand-header">
                  <div className="brand-avatar">TC</div>
                  <div className="brand-info">
                    <h3>TechCorp</h3>
                    <p>Technology</p>
                  </div>
                </div>
                <div className="brand-stats">
                  <div className="stat">
                    <span>24</span>
                    <label>Active Campaigns</label>
                  </div>
                  <div className="stat">
                    <span>$15k</span>
                    <label>Avg. Budget</label>
                  </div>
                </div>
                <p className="brand-bio">Leading tech company seeking creators for product reviews</p>
                <div className="brand-actions">
                  <button className="view-button">View Profile</button>
                  <button className="message-button">Message</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>My Profile</h2>
            <div className="profile-content">
              <div className="profile-header">
                <div className="profile-avatar">
                  {/* Add avatar image or placeholder */}
                </div>
                <div className="profile-info">
                  <h3>Your Name</h3>
                  <p>@yourhandle</p>
                </div>
              </div>
              <div className="profile-stats">
                <div className="stat">
                  <h4>Followers</h4>
                  <p>10.5k</p>
                </div>
                <div className="stat">
                  <h4>Engagement Rate</h4>
                  <p>4.2%</p>
                </div>
                <div className="stat">
                  <h4>Content Type</h4>
                  <p>Tech Reviews, Tutorials</p>
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

export default CreatorDashboard; 