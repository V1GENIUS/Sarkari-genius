import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import All_api from '../Api/All_api';
import LoadingSpinner from '../LoadingSpinner';

function Dashboard() {
  const [totalJobs, setTotalJobs] = useState(null);
  const [totalPrivateJobs, setTotalPrivateJobs] = useState(null);
  const [totalGovtJobs, setTotalGovtJobs] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data from the API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(All_api.APIDashboardData.TotalCount); // Make sure this is the correct API endpoint
        setTotalJobs(response.data.totalRequestForm);
        setTotalPrivateJobs(response.data.totalPrivateJobs);
        setTotalGovtJobs(response.data.totalGovtJobs);
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <LoadingSpinner loading={true} />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Welcome to the Dashboard Genius</h1>
          <p>Your hub for managing all job postings</p>
        </header>
        <div className="dashboard-summary">
        <div className="summary-card">
            <h2>Total Users</h2>
            <p className="count">{totalUsers}</p>
          </div>
          <div className="summary-card">
            <h2>Form Fill Request</h2>
            <p className="count">{totalJobs}</p>
          </div>
          <div className="summary-card">
            <h2>Total Private Jobs</h2>
            <p className="count">{totalPrivateJobs}</p>
          </div>
          <div className="summary-card">
            <h2>Total Govt Jobs</h2>
            <p className="count">{totalGovtJobs}</p>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
