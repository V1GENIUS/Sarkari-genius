import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import CreateJobPopup from './CreateJobPopup';
import All_api from '../Api/All_api';
import LoadingSpinner from '../LoadingSpinner';
import CreateCard from './CreateCard';
import EditJob from './EditJob';
import CreatePrivateJobs from './CreatePrivateJobs';

import EditPrivateJob from './EditPrivateJob';

function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isJobPopupVisible, setJobPopupVisible] = useState(false);
  const [isJobEditVisible, setJobEditVisible] = useState(false);
  const [isCardPopupVisible, setCardPopupVisible] = useState(false);
  const [isPrivateJobPopupVisible, setPrivateJobPopupVisible] = useState(false);
  const [isPrivateJobEditVisible, setPrivateJobEditVisible] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editJob, setEditJob] = useState(null);
  const [privateJobData, setPrivateJobData] = useState([]);
  const [editPrivateJob, setEditPrivateJob] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [editCard, setEditCard] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(All_api.APIGovtJobs.getAllJobs);
        setJobData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching job data");
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(All_api.APIGovtCards.getAllCards);
        // console.log(response.data);
        setCardData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching job data");
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const fetchPrivateJobs = async () => {
      try {
        const response = await axios.get(All_api.APIPrivateJobs.getAllPrivateJobs);
        // console.log(response.data);
        setPrivateJobData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching job data");
        setLoading(false);
      }
    };
    fetchPrivateJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(All_api.APIGovtJobs.deleteJob(jobId));
      setJobData(jobData.filter(job => job._id !== jobId));
    } catch (err) {
      setError("Error deleting job");
    }
  };

  const handleDeletePrivateJob = async (jobId) => {
    try {
      await axios.delete(All_api.APIPrivateJobs.deletePrivateJob(jobId));
      setPrivateJobData(privateJobData.filter(job => job._id !== jobId));
    } catch (err) {
      setError("Error deleting job");
    }
  };

  const handleViewClick = (job) => {
    navigate(`/job-detail/${job._id}`);
  };
  const handlePrivateJobClick = (job) => {
    navigate(`/pri-detail/${job._id}`);
  };

  const handleUpdateJob = async (updatedJob) => {
    try {
      // Assuming updatedJob contains _id and other fields to update
      const response = await axios.put(
        `${All_api.APIGovtJobs.updateJob}/${updatedJob._id}`,
        updatedJob
      );
      setJobData(jobData.map(job => (job._id === updatedJob._id ? response.data.job : job)));
      setJobEditVisible(false);
      setEditJob(null);
    } catch (err) {
      setError("Error updating job");
    }
  };

  const handleUpdatePrivateJob = async (updatePrivateJob) => {
    try {
      // Assuming updatedJob contains _id and other fields to update
      const response = await axios.put(
        `${All_api.APIPrivateJobs.updatePrivateJob}/${updatePrivateJob._id}`,
        updatePrivateJob
      );
      setPrivateJobData(privateJobData.map(job => (job._id === updatePrivateJob._id ? response.data.job : job)));
      setPrivateJobEditVisible(false);
      setEditPrivateJob(null);

    } catch (err) {
      setError("Error updating job");
    }
  };

  // Updated: Now this function opens the EditJob modal
  const handleEditJob = (job) => {
    setEditJob(job);
    setJobEditVisible(true);
  };

  const handleEditPrivateJob = (job) => {
    setEditPrivateJob(job);
    // setPrivateJobPopupVisible(true);
    setPrivateJobEditVisible(true);

  };


  const handleEditCard = (card) => {
    setEditCard(card);
    setCardPopupVisible(true);
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await axios.delete(All_api.APIGovtCards.deleteCard(cardId));
      setCardData(cardData.filter(card => card._id !== cardId));
    } catch (err) {
      setError("Error deleting card");
    }
  };

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const options = { day: "numeric", month: "long" };
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", options).format(date);
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "";
    }
  };

 

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div>
          <div className="dashboard_head">
            <h1>Dashboard</h1>
          </div>

          <div style={{ display: 'flex' }}>
            <div>
              <button className="job-create" onClick={() => setJobPopupVisible(true)}>
                + Create Job
              </button>
              <CreateJobPopup
                isVisible={isJobPopupVisible}
                onClose={() => setJobPopupVisible(false)}
              />
            </div>
            <div>
              <button className="job-create" onClick={() => setCardPopupVisible(true)}>
                + Create Card
              </button>
              <CreateCard
                isVisible={isCardPopupVisible}
                onClose={() => setCardPopupVisible(false)}
                job={editCard}
              />
            </div>
            <div>
              <button className="job-create" onClick={() => setPrivateJobPopupVisible(true)}>
                + Create Private Job
              </button>
              <CreatePrivateJobs
                isVisible={isPrivateJobPopupVisible}
                onClose={() => setPrivateJobPopupVisible(false)}
                job={editCard}
              />
            </div>
            
            
          </div>

          {isJobEditVisible && (
            <EditJob
              job={editJob}
              isVisible={isJobEditVisible}
              onClose={() => setJobEditVisible(false)}
              onSave={handleUpdateJob}
            />
          )}

          {/* {isPrivateJobEditVisible && (
                      <EditPrivateJob
                        job={editPrivateJob}
                        isVisible={isPrivateJobEditVisible}
                        onClose={() => setPrivateJobEditVisible(false)}
                        onSave={handleUpdatePrivateJob}
                      />
                    )}   */}

<EditPrivateJob
  job={editPrivateJob}
  isVisible={isPrivateJobEditVisible}
  onClose={() => setPrivateJobEditVisible(false)}
  onSave={handleUpdatePrivateJob}
/>


          <div className="job-details-container">
            <h1>Job Details</h1>
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
                {jobData.map((job, index) => (
                  <tr key={index}>
                    <td>{job.postName}</td>
                    <td style={{}}>
                      {job.importantDates.map((dates, i) => (
                        <div key={i}>
                          {formatDate(dates.startDate)} 
                         <br/><b style={{color:'red'}}>{formatDate(dates.lastDate)}</b>
                        </div>
                      ))}
                    </td>
                    <td>{job.organization}</td>
                  
                    <td>
                      {job.ageLimit.min} - {job.ageLimit.max} years
                    </td>
                    <td>
                      <button className="form-btn" onClick={() => handleViewClick(job)}>
                        View
                      </button>
                      <button className="form-btn" onClick={() => handleEditJob(job)}>
                        Edit
                      </button>
                      <button className="form-btn" onClick={() => handleDeleteJob(job._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


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
                {privateJobData.map((job, index) => (
                  <tr key={index}>
                    <td>{job.JobDegination}</td>
                    
                    <td>{job.organization}</td>
                  
                    <td>
                      <button className="form-btn" onClick={() => handlePrivateJobClick(job)}>
                        View
                      </button>
                      <button className="form-btn" onClick={() => handleEditPrivateJob(job)}>
                        Edit
                      </button>
                      <button className="form-btn" onClick={() => handleDeletePrivateJob(job._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="job-details-container">
            <h1>Card Details</h1>
            <table className="job-details-table">
              <thead>
                <tr>
                  <th>Card Name</th>
                  <th>Link Name</th>
                  <th>Link Url</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cardData.map((card, index) => (
                  <tr key={index}>
                    <td>{card.cardName}</td>
                    <td>
                      {card.linksName.map((link, i) => (
                        <div key={i}>
                          {link.linkName}: <br /> {link.linkURL}
                        </div>
                      ))}
                    </td>
                    <td>
                      <button className="form-btn" onClick={() => handleViewClick(card)}>
                        View
                      </button>
                      <button className="form-btn" onClick={() => handleEditCard(card)}>
                        Edit
                      </button>
                      <button className="form-btn" onClick={() => handleDeleteCard(card._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
