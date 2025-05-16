import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GovtFormRequest.css';
import Sidebar from './Sidebar';
import All_api from '../Api/All_api';
import LoadingSpinner from '../LoadingSpinner';

function GovtFormRequest() {
  const [error, setError] = useState(null);
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequest = async () => {
    try {
      const response = await axios.get(All_api.APIGovtJobs.getAllGovtRequest);
      const validData = Array.isArray(response.data.requests) ? response.data.requests : [];
      setRequestData(validData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error fetching job data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
    const intervalId = setInterval(fetchRequest, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const deleteRequest = async (id) => {
    try {
      await axios.delete(All_api.APIGovtJobs.deleteGovtRequest(id));
      setRequestData((prev = []) => Array.isArray(prev) ? prev.filter(req => req._id !== id) : []);
    } catch (err) {
      console.error("Error deleting request:", err);
      setError("Could not delete request");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(All_api.APIGovtJobs.updateGovtRequestStatus(id), {
        status: newStatus,
      });
      setRequestData((prev = []) => Array.isArray(prev)
        ? prev.map(req => req._id === id ? { ...req, status: newStatus } : req)
        : []
      );
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Could not update status");
    }
  };

  if (loading) return <LoadingSpinner loading={loading} />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard_content">
        <div className="dashboard_head">
          <h1>Total Requests ({requestData.length})</h1>
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
                <th>Status</th>
                <th>Actions</th>
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
                  <td>
                    <select
                      value={request.status || 'Request Received'}
                      onChange={(e) => updateStatus(request._id, e.target.value)}
                    >
                      <option value="Request Received">Request Received</option>
                      <option value="Viewed">Viewed</option>
                      <option value="Waiting for Platform">Waiting for Platform</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteRequest(request._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {requestData.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GovtFormRequest;
