import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GovtFormRequest.css'
import Sidebar from './Sidebar';
import All_api from '../Components/Api/All_api.js';
import LoadingSpinner from '../LoadingSpinner';

function GovtFormRequest() {
  const [error, setError] = useState(null);
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(APIGovtJobs.getAllGovtRequest);
        setRequestData(response.data.requests); // ✅ corrected to match actual response key
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching job data");
        setLoading(false);
      }
    };
  
    fetchRequest();
  }, []);
  

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard_content">
        <div className="dashboard_head">
          <h1>Total Requests</h1>
        </div>

        <div className="job-details-container">
          <h2>Submitted Request Forms</h2>
          <table className="job-details-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>WhatsApp</th>
                <th>Address</th>
                <th>Job Details</th>
              </tr>
            </thead>
            <tbody>
              {requestData.map((request, index) => (
                <tr key={request._id || index}>
                  <td>{index + 1}</td>
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>{request.mobile}</td>
                  <td>{request.whatsapp}</td>
                  <td>{request.address}</td>
                  <td>{request.jobDetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GovtFormRequest;
