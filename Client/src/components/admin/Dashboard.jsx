import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Dashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    blockedUsers: 0,
    totalArticles: 0,
    reportedComments: 0
  });

  // Add authentication check here
  const isAdmin = true; // Replace with actual admin check

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Blocked Users</h3>
          <p className="stat-number">{stats.blockedUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Articles</h3>
          <p className="stat-number">{stats.totalArticles}</p>
        </div>
        <div className="stat-card">
          <h3>Reported Comments</h3>
          <p className="stat-number">{stats.reportedComments}</p>
        </div>
      </div>
      
      <div className="users-management">
        <h2>User Management</h2>
        <div className="users-table">
          {/* Users table implementation */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 