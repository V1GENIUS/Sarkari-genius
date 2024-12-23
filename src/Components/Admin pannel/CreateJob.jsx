import React, { useState } from 'react';
import axios from 'axios';
import './CreateJob.css';
import Sidebar from './Sidebar';

function CreateJob() {
  const [jobDetails, setJobDetails] = useState({
    postName: '',
    organization: '',
    fees: [{ category: '', amount: '' }],
    ageLimit: {
      min: '',
      max: '',
      relaxation: '',
    },
    eligibility: [{ postName: '', posts: '', qualification: '' }],
  });

  const [message, setMessage] = useState({ type: '', text: '' }); // For confirmation or error messages

  const handleChange = (e, field, index) => {
    const value = e.target.value;
    const updatedDetails = { ...jobDetails };

    if (field === 'fees') {
      updatedDetails.fees[index][e.target.name] = value;
    } else if (field === 'eligibility') {
      updatedDetails.eligibility[index][e.target.name] = value;
    } else if (field === 'ageLimit') {
      updatedDetails.ageLimit[e.target.name] = value;
    } else {
      updatedDetails[field] = value;
    }

    setJobDetails(updatedDetails);
  };

  const addRow = (field) => {
    const updatedDetails = { ...jobDetails };
    if (field === 'fees') updatedDetails[field].push({ category: '', amount: '' });
    else if (field === 'eligibility') updatedDetails[field].push({ postName: '', posts: '', qualification: '' });

    setJobDetails(updatedDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/jobs', jobDetails, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Set success message
      setMessage({ type: 'success', text: 'Job successfully created!' });

      // Optionally reset the form
      setJobDetails({
        postName: '',
        organization: '',
        fees: [{ category: '', amount: '' }],
        ageLimit: {
          min: '',
          max: '',
          relaxation: '',
        },
        eligibility: [{ postName: '', posts: '', qualification: '' }],
      });
    } catch (error) {
      // Set error message
      setMessage({
        type: 'error',
        text: error.response ? error.response.data.message : 'Error creating job.',
      });
    }
  };

  return (
    <div className="create-job-container">
      <Sidebar />
      <div className="job-details">
        <form onSubmit={handleSubmit} className="job-form">
          <h1>Create Job Post</h1>

          {/* Display message */}
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-group">
            <label>Post Name</label>
            <input
              type="text"
              value={jobDetails.postName}
              onChange={(e) => handleChange(e, 'postName')}
              placeholder="Enter post name"
            />
          </div>
          <div className="form-group">
            <label>Organization</label>
            <input
              type="text"
              value={jobDetails.organization}
              onChange={(e) => handleChange(e, 'organization')}
              placeholder="Enter organization name"
            />
          </div>

          <h2>Application Fee</h2>
          {jobDetails.fees.map((fee, index) => (
            <div key={index} className="form-row">
              <input
                name="category"
                type="text"
                placeholder="Category"
                value={fee.category}
                onChange={(e) => handleChange(e, 'fees', index)}
              />
              <input
                name="amount"
                type="text"
                placeholder="Amount"
                value={fee.amount}
                onChange={(e) => handleChange(e, 'fees', index)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addRow('fees')} className="add-button">
            Add Fee
          </button>

          <h2>Age Limit</h2>
          <div className="form-row">
            <input
              type="text"
              name="min"
              placeholder="Min Age"
              value={jobDetails.ageLimit.min}
              onChange={(e) => handleChange(e, 'ageLimit')}
            />
            <input
              type="text"
              name="max"
              placeholder="Max Age"
              value={jobDetails.ageLimit.max}
              onChange={(e) => handleChange(e, 'ageLimit')}
            />
            <input
              type="text"
              name="relaxation"
              placeholder="Relaxation"
              value={jobDetails.ageLimit.relaxation}
              onChange={(e) => handleChange(e, 'ageLimit')}
            />
          </div>

          <h2>Eligibility</h2>
          {jobDetails.eligibility.map((elig, index) => (
            <div key={index} className="form-row">
              <input
                name="postName"
                type="text"
                placeholder="Post Name"
                value={elig.postName}
                onChange={(e) => handleChange(e, 'eligibility', index)}
              />
              <input
                name="posts"
                type="text"
                placeholder="No. of Posts"
                value={elig.posts}
                onChange={(e) => handleChange(e, 'eligibility', index)}
              />
              <textarea
                name="qualification"
                placeholder="Qualification"
                value={elig.qualification}
                onChange={(e) => handleChange(e, 'eligibility', index)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addRow('eligibility')} className="add-button">
            Add Eligibility
          </button>

          <button type="submit" className="submit-button">
            Submit Job Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
