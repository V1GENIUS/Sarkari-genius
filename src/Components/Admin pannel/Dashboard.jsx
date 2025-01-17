import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import CreateJobPopup from './CreateJobPopup';
import APIGovtJobs from "../Api/ApiGovtJobs";

function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editJob, setEditJob] = useState(null); 

  
  // useEffect(() => {
  //   axios.post('http://localhost:7000/api/visitor')
  //     .then(response => {
      
  //       console.log(response.data.message);
  //     })
  //     .catch(err => {
  //       setError('Error updating visitor count');
  //       console.error(err);
  //     });
  // }, []);

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


  const handleDeleteJob = async (jobId) => {
    try {
     
      await axios.delete(APIGovtJobs.deleteJob(jobId));
      setJobData(jobData.filter(job => job._id !== jobId)); 
    } catch (err) {
      setError("Error deleting job");
    }
  };

  // const handleEditJob = (job) => {
  //   setEditJob(job); 
  //   setPopupVisible(true); 
  // };

  const handleEditJob = (job) => {
    setEditJob(job);
    setPopupVisible(true);
  };

  // const handleUpdateJob = async (updatedJob) => {
  //   try {
  //     const response = await axios.put(APIGovtJobs.updateJob(), updatedJob);
  //     setJobData(jobData.map(job => (job._id === updatedJob._id ? response.data.job : job)));
  //     setPopupVisible(false);
  //   } catch (err) {
  //     setError("Error updating job");
  //   }
  // };

  const handleUpdateJob = async (updatedJob) => {
    try {
      const response = await axios.put(APIGovtJobs.updateJob(), updatedJob);
      setJobData(jobData.map(job => (job._id === updatedJob._id ? response.data.job : job)));
      setPopupVisible(false);
      setEditJob(null);
    } catch (err) {
      setError("Error updating job");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
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
              <button className='job-create' onClick={() => setPopupVisible(true)}>+ Create Job</button>
              <CreateJobPopup
                isVisible={isPopupVisible}
                onClose={() => setPopupVisible(false)}
                job={editJob} 
                onSave={handleUpdateJob} 
              />
            </div>
            <div>
              <button className='job-create' onClick={CreateJobLink}>Create Job Link</button>
            </div>
          </div>

         

          <div className='orderBox'>
        
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
                {/* {jobData.map((job, index) => (
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
                          {fee.category}: <br/> ₹{fee.amount}
                        </div>
                      ))}
                    </td>
                    <td>
                      {job.ageLimit.min} - {job.ageLimit.max} years{" "}
                     
                    </td>
                  
                    <td>
                      <button onClick={() => handleEditJob(job)}>Edit</button>
                      <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
                    </td>
                  </tr>
                ))} */}

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
                      <button onClick={() => handleEditJob(job)}>Edit</button>
                      <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
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
