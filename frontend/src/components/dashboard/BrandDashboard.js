import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const BrandDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('opportunities');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [stats, setStats] = useState({
    activeListings: 0,
    totalApplications: 0,
    profileViews: 0
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    minBudget: '',
    maxBudget: '',
    category: '',
    platform: '',
    requirements: [],
    targetAudience: [],
    duration: '',
    deliverables: []
  });
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    companyName: '',
    industry: '',
    website: '',
    description: '',
    targetMarkets: [],
    companySize: '',
    location: ''
  });

  useEffect(() => {
    // Fetch brand's actual stats from the backend
    const fetchBrandStats = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData) return;

        const response = await fetch(`http://localhost:5000/api/brands/${userData.id}/stats`, {
          headers: {
            'Authorization': `Bearer ${userData.token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStats({
            activeListings: data.activeListings || 0,
            totalApplications: data.totalApplications || 0,
            profileViews: data.profileViews || 0
          });
        }
      } catch (error) {
        console.error('Error fetching brand stats:', error);
      }
    };

    fetchBrandStats();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequirementChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      requirements: checked 
        ? [...prev.requirements, value]
        : prev.requirements.filter(req => req !== value)
    }));
  };

  const handleTargetAudienceChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      targetAudience: checked 
        ? [...prev.targetAudience, value]
        : prev.targetAudience.filter(aud => aud !== value)
    }));
  };

  const handleDeliverableChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      deliverables: checked 
        ? [...prev.deliverables, value]
        : prev.deliverables.filter(del => del !== value)
    }));
  };

  const handleTargetMarketChange = (e) => {
    const { value, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      targetMarkets: checked 
        ? [...prev.targetMarkets, value]
        : prev.targetMarkets.filter(market => market !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile update
    console.log('Profile updated:', profileData);
    setShowEditProfile(false);
  };

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
                <p className="card-content">Seeking fitness influencers for summer collection promotion...</p>
                <div className="card-stats">
                  <span>Applications: 12</span>
                  <span>Budget: $5,000</span>
                </div>
                <button className="primary-button">View Details</button>
              </div>
              <div className="opportunity-card">
                <h3 className="card-title">Holiday Special</h3>
                <p className="card-subtitle">Draft</p>
                <p className="card-content">Planning holiday season promotional campaign...</p>
                <div className="card-stats">
                  <span>Applications: 0</span>
                  <span>Budget: $8,000</span>
                </div>
                <button className="primary-button">Edit Campaign</button>
              </div>
            </div>
            <button className="primary-button" style={{ marginTop: '2rem' }}>Create New Campaign</button>
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