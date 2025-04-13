import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const CreatorDashboard = () => {
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleApply = (opportunityId) => {
    // Handle apply functionality
    console.log('Applying to opportunity:', opportunityId);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, value]
        : prev.categories.filter(cat => cat !== value)
    }));
  };

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      languages: checked 
        ? [...prev.languages, value]
        : prev.languages.filter(lang => lang !== value)
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile update
    console.log('Profile updated:', profileData);
    setShowEditProfile(false);
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
          onClick={() => handleTabClick('opportunities')}
        >
          Opportunities
        </button>
        <button 
          className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => handleTabClick('applications')}
        >
          My Applications
        </button>
        <button 
          className={`tab ${activeTab === 'brands' ? 'active' : ''}`}
          onClick={() => handleTabClick('brands')}
        >
          Brands
        </button>
        <button 
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabClick('profile')}
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
              <p className="card-subtitle">Sports & Fitness</p>
              <p className="card-content">Global athletic wear brand seeking fitness influencers...</p>
              <button className="secondary-button">View Profile</button>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-avatar">JD</div>
              <div className="profile-info">
                <h3>John Doe</h3>
                <p>Fitness & Lifestyle Creator</p>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat">
                <h4>Followers</h4>
                <p>50K</p>
              </div>
              <div className="stat">
                <h4>Engagement</h4>
                <p>5.2%</p>
              </div>
              <div className="stat">
                <h4>Completed</h4>
                <p>12</p>
              </div>
            </div>
            {!showEditProfile ? (
              <button className="primary-button" onClick={() => setShowEditProfile(true)}>
                Edit Profile
              </button>
            ) : (
              <form className="edit-profile-form" onSubmit={handleProfileSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileInputChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileInputChange}
                    placeholder="Your email"
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileInputChange}
                    placeholder="Tell us about yourself"
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleProfileInputChange}
                    placeholder="Your location"
                  />
                </div>
                <div className="form-group">
                  <label>Categories</label>
                  <div className="checkbox-group">
                    {['Fashion', 'Beauty', 'Lifestyle', 'Tech', 'Gaming', 'Food', 'Travel', 'Fitness'].map(category => (
                      <label key={category} className="checkbox-label">
                        <input
                          type="checkbox"
                          value={category}
                          checked={profileData.categories.includes(category)}
                          onChange={handleCategoryChange}
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Languages</label>
                  <div className="checkbox-group">
                    {['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese'].map(language => (
                      <label key={language} className="checkbox-label">
                        <input
                          type="checkbox"
                          value={language}
                          checked={profileData.languages.includes(language)}
                          onChange={handleLanguageChange}
                        />
                        {language}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Social Media</label>
                  <input
                    type="text"
                    name="socialMedia.instagram"
                    value={profileData.socialMedia.instagram}
                    onChange={handleProfileInputChange}
                    placeholder="Instagram username"
                  />
                  <input
                    type="text"
                    name="socialMedia.youtube"
                    value={profileData.socialMedia.youtube}
                    onChange={handleProfileInputChange}
                    placeholder="YouTube channel"
                  />
                  <input
                    type="text"
                    name="socialMedia.tiktok"
                    value={profileData.socialMedia.tiktok}
                    onChange={handleProfileInputChange}
                    placeholder="TikTok username"
                  />
                  <input
                    type="text"
                    name="socialMedia.twitter"
                    value={profileData.socialMedia.twitter}
                    onChange={handleProfileInputChange}
                    placeholder="Twitter handle"
                  />
                </div>
                <div className="button-group">
                  <button type="submit" className="submit-button">Save Changes</button>
                  <button type="button" className="cancel-button" onClick={() => setShowEditProfile(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard; 