import React, { useEffect, useState } from "react";
import axios from "axios";

import All_api from '../Components/Api/All_api.js';

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(APIGovtJobs.Analytics);
        setAnalytics(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Analytics</h1>
      <table border="1">
        <thead>
          <tr>
            <th>IP Address</th>
            <th>User Agent</th>
            <th>Job ID</th>
            <th>Visited At</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map((entry, index) => (
            <tr key={index}>
              <td>{entry.ip}</td>
              <td>{entry.userAgent}</td>
              <td>{entry.jobId}</td>
              <td>{new Date(entry.visitedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyticsPage;
