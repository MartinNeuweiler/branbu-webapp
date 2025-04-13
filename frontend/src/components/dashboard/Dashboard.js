import React, { useState } from 'react';
import MessageCenter from '../messaging/MessageCenter';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard</h1>
          <button className="logout-button">Logout</button>
        </div>
      </div>
      
      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab ${activeTab === 'opportunities' ? 'active' : ''}`}
          onClick={() => setActiveTab('opportunities')}
        >
          Opportunities
        </button>
        <button
          className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            {/* Profile content */}
          </div>
        )}
        {activeTab === 'opportunities' && (
          <div className="opportunities-section">
            {/* Opportunities content */}
          </div>
        )}
        {activeTab === 'messages' && (
          <MessageCenter />
        )}
      </div>
    </div>
  );
};

export default Dashboard; 