import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateJobPopup.css"; 
import All_api from '../Components/Api/All_api.js';

function EditPrivateJob({ job, isVisible, onClose }) {
   const [PrivateJobDetails, setPrivateJobDetails] = useState({
      JobDegination: "",
      organization: "",
      salary: "",
      experience: "",
      batch: "",
      Qualification: "",
      location: "", 
      applyLink: "",
    });


useEffect(() => {
    if (job) {
        setPrivateJobDetails({
        JobDegination: job.JobDegination || "",  
        organization: job.organization || "",
        salary: job.salary || "",
        experience: job.experience || "",
        batch: job.batch || "",
        Qualification: job.Qualification || "",
        location: job.location || "",
        applyLink: job.applyLink || ""
      });
    }
  }, [job]);
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrivateJobDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(APIPrivateJobs.updatePrivateJob(job._id), PrivateJobDetails);
      console.log("Job updated successfully", response.data);
      alert("Job Updated Successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className="popup-form">
          <h1>Edit Job Post</h1>

          <div className="form-group">
            <label>Job Designation</label>
            <input
              type="text"
              name="JobDegination"
              value={PrivateJobDetails.JobDegination}
              onChange={handleChange}
              placeholder="Enter Job Designation"
              required
            />
          </div>
          <div className="form-group">
            <label>Organization</label>
            <input
              type="text"
              name="organization"
              value={PrivateJobDetails.organization}
              onChange={handleChange}
              placeholder="Enter Organization Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              type="text"
              name="salary"
              value={PrivateJobDetails.salary}
              onChange={handleChange}
              placeholder="Enter Total Salary"
              required
            />
          </div>
          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              value={PrivateJobDetails.experience}
              onChange={handleChange}
              placeholder="Enter Experience"
              required
            />
          </div>
          <div className="form-group">
            <label>Batch</label>
            <input
              type="text"
              name="batch"
              value={PrivateJobDetails.batch}
              onChange={handleChange}
              placeholder="Enter Batch"
              required
            />
          </div>
          <div className="form-group">
            <label>Qualification</label>
            <input
              type="text"
              name="Qualification"
              value={PrivateJobDetails.Qualification}
              onChange={handleChange}
              placeholder="Enter Qualification"
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={PrivateJobDetails.location}
              onChange={handleChange}
              placeholder="Enter Location"
              required
            />
          </div>
          <div className="form-group">
            <label>Apply Link</label>
            <input
              type="text"
              name="applyLink"
              value={PrivateJobDetails.applyLink}
              onChange={handleChange}
              placeholder="Enter Apply Link"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPrivateJob;
