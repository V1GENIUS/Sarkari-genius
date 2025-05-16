import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './JobDetailPage.css';
import Sidebar from './Sidebar';
import CreateJobPopup from './CreateJobPopup';
import All_api from '../Api/All_api';
import LoadingSpinner from '../LoadingSpinner';
import CreateCard from './CreateCard';
import EditJob from './EditJob';
import CreatePrivateJobs from './CreatePrivateJobs';
import EditPrivateJob from './EditPrivateJob';
import ActionMenu from './ActionMenu';

function JobDetailPage() {
  const navigate = useNavigate();

  const [jobData, setJobData] = useState([]);
  const [privateJobData, setPrivateJobData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editJob, setEditJob] = useState(null);
  const [editPrivateJob, setEditPrivateJob] = useState(null);
  const [editCard, setEditCard] = useState(null);

  const [isJobPopupVisible, setJobPopupVisible] = useState(false);
  const [isJobEditVisible, setJobEditVisible] = useState(false);
  const [isCardPopupVisible, setCardPopupVisible] = useState(false);
  const [isPrivateJobPopupVisible, setPrivateJobPopupVisible] = useState(false);
  const [isPrivateJobEditVisible, setPrivateJobEditVisible] = useState(false);

  // Reusable auto-refresh fetcher
  const useAutoRefresh = (fetchFn, setter, extract = d => d) => {
    useEffect(() => {
      let isMounted = true;
      const fetchData = async () => {
        try {
          const response = await fetchFn();
          if (isMounted) setter(extract(response.data));
        } catch (err) {
          if (isMounted) setError('Error fetching data');
        } finally {
          if (isMounted) setLoading(false);
        }
      };

      fetchData();
      const interval = setInterval(fetchData, 3000);
      return () => {
        clearInterval(interval);
        isMounted = false;
      };
    }, [fetchFn, setter]);
  };

  // Fetch data
  useAutoRefresh(() => axios.get(All_api.APIGovtJobs.getAllJobs), setJobData, data => data.jobs || []);
  useAutoRefresh(() => axios.get(All_api.APIPrivateJobs.getAllPrivateJobs), setPrivateJobData, data => data.jobs || []);
  useAutoRefresh(() => axios.get(All_api.APIGovtCards.getAllCards), setCardData, data => data.cards || []);

  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(All_api.APIGovtJobs.deleteJob(id));
      setJobData(prev => prev.filter(job => job._id !== id));
    } catch {
      setError("Error deleting job");
    }
  };

  const handleDeletePrivateJob = async (id) => {
    try {
      await axios.delete(All_api.APIPrivateJobs.deletePrivateJob(id));
      setPrivateJobData(prev => prev.filter(job => job._id !== id));
    } catch {
      setError("Error deleting private job");
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(All_api.APIGovtCards.deleteCard(id));
      setCardData(prev => prev.filter(card => card._id !== id));
    } catch {
      setError("Error deleting card");
    }
  };

  const handleUpdateJob = async (updatedJob) => {
    try {
      const { data } = await axios.put(`${All_api.APIGovtJobs.updateJob}/${updatedJob._id}`, updatedJob);
      setJobData(prev => prev.map(job => job._id === updatedJob._id ? data.job : job));
      setJobEditVisible(false);
      setEditJob(null);
    } catch {
      setError("Error updating job");
    }
  };

  const handleUpdatePrivateJob = async (updatedJob) => {
    try {
      const { data } = await axios.put(`${All_api.APIPrivateJobs.updatePrivateJob}/${updatedJob._id}`, updatedJob);
      setPrivateJobData(prev => prev.map(job => job._id === updatedJob._id ? data.job : job));
      setPrivateJobEditVisible(false);
      setEditPrivateJob(null);
    } catch {
      setError("Error updating private job");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long" }).format(date);
    } catch {
      return "";
    }
  };

  if (loading) return <LoadingSpinner loading={true} />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="jobPageDetials">
      <Sidebar />
      <div>
        <div className="jobPageDetials_head">
          <h1>Job Details Page</h1>
        </div>

        <div style={{ display: 'flex' }}>
          <button className="job-create" onClick={() => setJobPopupVisible(true)}>+ Create Job</button>
          <button className="job-create" onClick={() => setCardPopupVisible(true)}>+ Create Card</button>
          <button className="job-create" onClick={() => setPrivateJobPopupVisible(true)}>+ Create Private Job</button>
        </div>

        <CreateJobPopup isVisible={isJobPopupVisible} onClose={() => setJobPopupVisible(false)} />
        <CreateCard isVisible={isCardPopupVisible} onClose={() => setCardPopupVisible(false)} job={editCard} />
        <CreatePrivateJobs isVisible={isPrivateJobPopupVisible} onClose={() => setPrivateJobPopupVisible(false)} job={editCard} />
        <EditJob job={editJob} isVisible={isJobEditVisible} onClose={() => setJobEditVisible(false)} onSave={handleUpdateJob} />
        <EditPrivateJob job={editPrivateJob} isVisible={isPrivateJobEditVisible} onClose={() => setPrivateJobEditVisible(false)} onSave={handleUpdatePrivateJob} />

        {/* Government Jobs */}
        <div className="job-details-container">
          <h1>Government Job Details</h1>
          <table className="job-details-table">
            <thead>
              <tr>
                <th>Post Name</th>
                <th>Dates</th>
                <th>Organization</th>
                <th>Age Limit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobData.map(job => (
                <tr key={job._id}>
                  <td>{job.postName}</td>
                  <td>
                    {job.importantDates?.map((d, i) => (
                      <div key={i}>
                        {formatDate(d.startDate)} <br />
                        <b style={{ color: 'red' }}>{formatDate(d.lastDate)}</b>
                      </div>
                    ))}
                  </td>
                  <td>{job.organization}</td>
                  <td>{job.ageLimit?.min} - {job.ageLimit?.max} years</td>
                  <td>
                    <ActionMenu
                      onView={() => navigate(`/job-detail/${job._id}`)}
                      onEdit={() => { setEditJob(job); setJobEditVisible(true); }}
                      onDelete={() => handleDeleteJob(job._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Private Jobs */}
        <div className="job-details-container">
          <h1>Private Job Details</h1>
          <table className="job-details-table">
            <thead>
              <tr>
                <th>Job Designation</th>
                <th>Organization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {privateJobData.map(job => (
                <tr key={job._id}>
                  <td>{job.JobDegination}</td>
                  <td>{job.organization}</td>
                  <td>
                    <ActionMenu
                      onView={() => navigate(`/pri-detail/${job._id}`)}
                      onEdit={() => { setEditPrivateJob(job); setPrivateJobEditVisible(true); }}
                      onDelete={() => handleDeletePrivateJob(job._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards */}
        <div className="job-details-container">
          <h1>Card Details</h1>
          <table className="job-details-table">
            <thead>
              <tr>
                <th>Card Name</th>
                <th>Link Name & URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cardData.map(card => (
                <tr key={card._id}>
                  <td>{card.cardName}</td>
                  <td>
                    {card.linksName?.map((link, i) => (
                      <div key={i}>
                        {link.linkName}:<br />{link.linkURL}
                      </div>
                    ))}
                  </td>
                  <td>
                    <button className="form-btn" onClick={() => handleDeleteCard(card._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;
