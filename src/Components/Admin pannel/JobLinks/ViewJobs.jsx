import React, { useEffect, useState } from 'react';
import './ViewJob.css'

function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [jobName, setJobName] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch jobs from the backend
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://sarkari-genius.vercel.app/api/jobs');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Update a job
  const updateJob = async (id, updatedData) => {
    setError('');
    try {
      console.log('Updating job:', id, updatedData);
      const response = await fetch(`https://sarkari-genius.vercel.app/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      console.log('Update response:', data);
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === id ? data.updatedJob : job))
      );
      setEditJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Failed to update job.');
    }
  };

  // Delete a job
  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    setError('');
    try {
      console.log('Deleting job:', id);
      const response = await fetch(`https://sarkari-genius.vercel.app/api/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('Failed to delete job.');
    }
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setJobName(job.jobName);
    setJobLink(job.jobLink);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateJob(editJob._id, { jobName, jobLink });
  };

  return (
    <div className="view-jobs-container">
      
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {editJob ? (
        <form className="edit-form" onSubmit={handleUpdate}>
          <h2 className="form-title">Update Job</h2>
          <div className="form-group">
            <label>Job Name</label>
            <input
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Job Link</label>
            <input
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn btn-secondary" onClick={() => setEditJob(null)}>
            Cancel
          </button>
        </form>
      ) : (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job._id} className="job-item">
              <span className="job-name">{job.jobName}</span>
              <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="job-link">
                View
              </a>
              <button className="btn btn-edit" onClick={() => handleEdit(job)}>Edit</button>
              <button className="btn btn-delete" onClick={() => deleteJob(job._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewJobs;
