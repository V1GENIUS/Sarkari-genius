import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateJobPopup.css";
import All_api from '../Components/Api/All_api.js';

function CreatePrivateJobs({ PrivateJobData, isVisible, onClose, isEditMode }) {
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

  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (isEditMode && PrivateJobData) {
      setPrivateJobDetails(PrivateJobData);
    }
  }, [PrivateJobData, isEditMode]);

  // ✅ Fixed: handleChange now updates state correctly
  const handleChange = (e, field) => {
    const { value } = e.target;
    setPrivateJobDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiCall = isEditMode
        ? axios.put(APIPrivateJobs.getPrivateJobDetails, PrivateJobDetails, {
            headers: { "Content-Type": "application/json" },
          })
        : axios.post(APIPrivateJobs.createPrivateJob, PrivateJobDetails, {
            headers: { "Content-Type": "application/json" },
          });

      await apiCall;
      setMessage({
        type: "success",
        text: isEditMode
          ? "Private Job successfully updated!"
          : "Private Job successfully created!",
      });
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error processing job details.",
      });
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
          <h1>{isEditMode ? "Edit Private Job" : "Create Private Job"}</h1>

          <div className="form-group">
            <label>Job Designation</label>
            <input
              type="text"
              value={PrivateJobDetails.JobDegination}
              onChange={(e) => handleChange(e, "JobDegination")}
              placeholder="Enter Job Designation"
              required
            />
          </div>
          <div className="form-group">
            <label>Organization</label>
            <input
              type="text"
              value={PrivateJobDetails.organization}
              onChange={(e) => handleChange(e, "organization")}
              placeholder="Enter Organization Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              type="text"
              value={PrivateJobDetails.salary}
              onChange={(e) => handleChange(e, "salary")}
              placeholder="Enter Total Salary"
              required
            />
          </div>
          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              value={PrivateJobDetails.experience}
              onChange={(e) => handleChange(e, "experience")}
              placeholder="Enter Experience"
              required
            />
          </div>
          <div className="form-group">
            <label>Batch</label>
            <input
              type="text"
              value={PrivateJobDetails.batch}
              onChange={(e) => handleChange(e, "batch")}
              placeholder="Enter Batch"
              required
            />
          </div>
          <div className="form-group">
            <label>Qualification</label>
            <input
              type="text"
              value={PrivateJobDetails.Qualification}
              onChange={(e) => handleChange(e, "Qualification")}
              placeholder="Enter Qualification"
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={PrivateJobDetails.location}
              onChange={(e) => handleChange(e, "location")}
              placeholder="Enter Location"
              required
            />
          </div>
          <div className="form-group">
            <label>Apply Link</label>
            <input
              type="text"
              value={PrivateJobDetails.applyLink}
              onChange={(e) => handleChange(e, "applyLink")}
              placeholder="Enter Apply Link"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {isEditMode ? "Update Private Job" : "Submit Private Job"}
          </button>
          {message.text && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreatePrivateJobs;
