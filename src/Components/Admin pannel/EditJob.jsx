import React, { useState, useEffect } from "react";
import axios from "axios";
import APIGovtJobs from "../Api/ApiGovtJobs";

function EditJob({ job, isVisible, onClose }) {
  const [jobDetails, setJobDetails] = useState({
    postName: "",
    organization: "",
    vacancy: "",
    salary: "",
    importantDates: [{ notificationDate: "", startDate: "", lastDate: "" }],
    fees: [{ category: "", amount: "" }],
    ageLimit: { min: "", max: "" },
  });

  useEffect(() => {
    if (job) setJobDetails(job);
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${APIGovtJobs.updateJob}/${job._id}`, jobDetails);
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
        <button className="close-button" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit} className="popup-form">
          <h1>Edit Job Post</h1>

          <label>Post Name</label>
          <input type="text" name="postName" value={jobDetails.postName} onChange={handleChange} required />

          <label>Organization</label>
          <input type="text" name="organization" value={jobDetails.organization} onChange={handleChange} required />

          <label>Vacancy</label>
          <input type="number" name="vacancy" value={jobDetails.vacancy} onChange={handleChange} required />

          <button type="submit">Update Job</button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;
