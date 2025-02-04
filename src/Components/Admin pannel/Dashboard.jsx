import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import CreateJobPopup from './CreateJobPopup';
import APIGovtJobs from "../Api/ApiGovtJobs";
import APIGovtCards from '../Api/ApiGovtCard';
import LoadingSpinner from '../LoadingSpinner';
import CreateCard from './CreateCard';

function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isJobPopupVisible, setJobPopupVisible] = useState(false); 
const [isCardPopupVisible, setCardPopupVisible] = useState(false); 
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editJob, setEditJob] = useState(null); 


  const [cardData, setCardData] = useState([]);
  const [editCard, setEditCard] = useState(null); 


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(APIGovtJobs.getAllJobs);
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
      
        const response = await axios.get(APIGovtCards.getAllCards);
        console.log(response.data);
        setCardData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching job data");
        setLoading(false);
      } 
    };
    fetchCards();
  }, []);


  const handleDeleteJob = async (jobId) => {
    try {
     
      await axios.delete(APIGovtJobs.deleteJob(jobId));
      setJobData(jobData.filter(job => job._id !== jobId)); 
    } catch (err) {
      setError("Error deleting job");
    }
  };

  
  const handleViewClick = (job) => {
    navigate(`/job-detail/${job._id}`);
  };
  const handleEditJob = (job) => {
    setEditJob(job);
    setJobPopupVisible(true);
  };


  const handleUpdateJob = async (updatedJob) => {
    try {
      const response = await axios.put(APIGovtJobs.updateJob(), updatedJob);
      setJobData(jobData.map(job => (job._id === updatedJob._id ? response.data.job : job)));
      setJobPopupVisible(false);
      setEditJob(null);
    } catch (err) {
      setError("Error updating job");
    }
  };

  const handleUpdateCard = async (updatedCard) => {
    try {
      const response = await axios.put(APIGovtCards.updateCard(), updatedCard);
      setCardData(cardData.map(card => (card._id === updatedCard._id ? response.data.card : card)));
      setCardPopupVisible(false);
      setEditJob(null);
    } catch (err) {
      setError("Error updating job");
    }
  };

  const handleEditCard = (card) => {
    setEditCard(card);
    setCardPopupVisible(true);
  };

  const handleDeleteCard = async (cardId) => {
    try {
     
      await axios.delete(APIGovtCards.deleteCard(cardId));
      setJobData(jobData.filter(card => card._id !== cardId)); 
    } catch (err) {
      setError("Error deleting job");
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
  

  const CreateJobLink = () => {
    navigate('/job-create');
  };

  return (
    <>
      <div className='dashboard'>
        <Sidebar />
        <div>
          <div className='dashboard_head'>
            <h1>Dashboard</h1>
          </div>


          <div style={{ display: 'flex' }}>
            <div>
              <button className='job-create' onClick={() => setJobPopupVisible(true)}>+ Create Job</button>
              <CreateJobPopup
                isVisible={isJobPopupVisible} 
                onClose={() => setJobPopupVisible(false)} 
                job={editJob}
                onSave={handleUpdateJob}
              />
            </div>
            <div>
              <button className='job-create' onClick={() => setCardPopupVisible(true)}>+ Create Card</button>
              <CreateCard
                isVisible={isCardPopupVisible} 
                onClose={() => setCardPopupVisible(false)}
                job={editCard}
                onSave={handleUpdateCard}
              />
            </div>
            <div>
              <button className='job-create' onClick={CreateJobLink}>Create Job Link</button>
            </div>
      </div>

      
          <div className="job-details-container">
            <h1>Job Details</h1>
            <table className="job-details-table">
              <thead>
                <tr>
                  <th>Post Name</th>
                  <th>Dates</th>
                  <th>Organization</th>
                  <th>Fees</th>
                  <th>Age Limit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
            

                {jobData.map((job, index) => (
                  <tr key={index}>
                    <td>{job.postName}</td>
                    <td>
                      {job.importantDates.map((dates, i) => (
                        <div key={i}>
                          Start: {formatDate(dates.startDate)} <br />
                          Last: {formatDate(dates.lastDate)}
                        </div>
                      ))}
                    </td>
                    <td>{job.organization}</td>
                    <td>
                      {job.fees.map((fee, i) => (
                        <div key={i}>
                          {fee.category}: <br /> ₹{fee.amount}
                        </div>
                      ))}
                    </td>
                    <td>
                      {job.ageLimit.min} - {job.ageLimit.max} years
                    </td>
                    <td>
                    <button className='form-btn' onClick={() => handleViewClick(job)}>View</button>
                      <button className='form-btn' onClick={() => handleEditJob(job._id)}>Edit</button>
                      <button className='form-btn' onClick={() => handleDeleteJob(job._id)}>Delete</button>
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
                  <th>Link Name </th>
                  <th>Link Url</th>
                 
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
                    <button className='form-btn' onClick={() => handleViewClick(card)}>View</button>
                      <button className='form-btn' onClick={() => handleEditCard(card._id)}>Edit</button>
                      <button className='form-btn' onClick={() => handleDeleteCard(card._id)}>Delete</button>
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
