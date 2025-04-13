import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const CreatorDashboard = () => {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('opportunities');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    socialMedia: {
      instagram: '',
      youtube: '',
      tiktok: '',
      twitter: ''
    },
    categories: [],
    languages: [],
    location: ''
  });
  // eslint-disable-next-line
  const [stats, setStats] = useState({
    activeProjects: 0,
    totalEarnings: 0,
    profileViews: 0
  });

  useEffect(() => {
    // Fetch user's actual stats from the backend
    const fetchUserStats = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData) return;

        const response = await fetch(`http://localhost:5000/api/users/${userData.id}/stats`, {
          headers: {
            'Authorization': `Bearer ${userData.token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStats({
            activeProjects: data.activeProjects || 0,
            totalEarnings: data.totalEarnings || 0,
            profileViews: data.profileViews || 0
          });
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

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
          <div className="opportunities-grid">
            <div className="opportunity-card">
              <h3 className="card-title">Summer Campaign</h3>
              <p className="card-subtitle">Nike</p>
              <p className="card-content">Looking for fitness influencers for our summer collection launch...</p>
              <button className="primary-button">Apply Now</button>
            </div>
            <div className="opportunity-card">
              <h3 className="card-title">Tech Review Series</h3>
              <p className="card-subtitle">Samsung</p>
              <p className="card-content">Seeking tech reviewers for our latest smartphone release...</p>
              <button className="primary-button">Apply Now</button>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-list">
            <div className="opportunity-card">
              <h3 className="card-title">Fitness Challenge</h3>
              <p className="card-subtitle">Status: Under Review</p>
              <p className="card-content">Applied on: June 15, 2024</p>
              <button className="secondary-button">View Details</button>
            </div>
          </div>
        )}

        {activeTab === 'brands' && (
          <div className="brands-grid">
            <div className="brand-card">
              <h3 className="card-title">Nike</h3>
              <p className="card-content">Global sportswear brand</p>
              <button className="secondary-button">View Profile</button>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            {showEditProfile ? (
              <form className="profile-form">
                <h2>Edit Profile</h2>
                {/* Profile form fields */}
                <button type="submit" className="primary-button">Save Changes</button>
                <button type="button" className="secondary-button" onClick={() => setShowEditProfile(false)}>Cancel</button>
              </form>
            ) : (
              <div className="profile-view">
                <h2>Profile</h2>
                <button className="primary-button" onClick={() => setShowEditProfile(true)}>Edit Profile</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard; 