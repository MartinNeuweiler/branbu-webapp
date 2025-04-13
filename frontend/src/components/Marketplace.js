import React, { useState } from 'react';
import './Marketplace.css';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    budget: 'all',
    platform: 'all'
  });

  // Mock data - replace with actual API calls
  const opportunities = [
    {
      id: 1,
      brand: 'TechCorp',
      title: 'Tech Review Content Creator',
      description: 'Looking for tech reviewers to showcase our latest gadgets',
      budget: '$500-$1000',
      category: 'Technology',
      platform: 'YouTube',
      requirements: '10k+ subscribers, tech review experience'
    },
    // Add more mock opportunities here
  ];

  return (
    <div className="marketplace">
      <div className="marketplace-header">
        <h1>Brand Opportunities</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="marketplace-filters">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="tech">Technology</option>
          <option value="fashion">Fashion</option>
          <option value="lifestyle">Lifestyle</option>
        </select>

        <select
          value={filters.budget}
          onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
        >
          <option value="all">All Budgets</option>
          <option value="small">$100-$500</option>
          <option value="medium">$500-$1000</option>
          <option value="large">$1000+</option>
        </select>

        <select
          value={filters.platform}
          onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
        >
          <option value="all">All Platforms</option>
          <option value="youtube">YouTube</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
        </select>
      </div>

      <div className="opportunities-grid">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="opportunity-card">
            <h3>{opportunity.title}</h3>
            <p className="brand-name">{opportunity.brand}</p>
            <p className="budget">Budget: {opportunity.budget}</p>
            <p className="description">{opportunity.description}</p>
            <div className="tags">
              <span className="tag">{opportunity.category}</span>
              <span className="tag">{opportunity.platform}</span>
            </div>
            <button className="apply-button">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace; 