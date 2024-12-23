import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import './CreateJobLink.css'
import ViewJobs from './ViewJobs';
function CreateJobLink() {
  const [jobName, setJobName] = useState('');
  const [jobLink, setJobLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:7000/api/create-job-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobName, jobLink }),
      });

      if (response.ok) {
        alert('Job added successfully!');
        setJobName('');
        setJobLink('');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding job');
    }
  };

  return (
    <div className="Create-Box">
    <Sidebar />
    <div style={{flexDirection:'column'}}>
    <div className="form-wrapper">
      <div className="form">
        <h2 className="heading">Create a New Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">Job Name</label>
            <input
              type="text"
              className="input"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Job Link</label>
            <input
              type="url"
              className="input"
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">
            Add Job
          </button>
        </form>
        
      </div>
     
      
    </div>
    <ViewJobs/>

    </div>

    
  </div>
  );
}

export default CreateJobLink;
