import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateJobPopup.css';
import All_api from '../Components/Api/All_api.js';

function CreateJobPopup({ jobData, isVisible, onClose, isEditMode }) {
  const [jobDetails, setJobDetails] = useState({
    postName: '',
    organization: '',
    vacancy: '',
    salary: '',
    importantDates: [{ notificationDate: '', startDate: '', lastDate: '' }],
    fees: [{ category: '', amount: '' }],
    ageLimit: { min: '', max: '', relaxation: '' },
    selectionProcess: '',
    Qualification: [''],
    jobLocation: { location: '' },
    documentDetails: [''],
    officialPdfLink: '',
    websiteLink: '',
    admitcard :''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isEditMode && jobData) {
      setJobDetails(jobData);
    }
  }, [jobData, isEditMode]);

  const handleChange = (e, field, index) => {
    const { name, value } = e.target;

    setJobDetails((prevDetails) => {
      const updated = { ...prevDetails };

      if (['fees', 'importantDates'].includes(field)) {
        updated[field][index][name] = value;
      } else if (field === 'ageLimit') {
        updated.ageLimit[name] = value;
      } else if (['documentDetails', 'Qualification'].includes(field)) {
        updated[field][index] = value;
      } else {
        updated[field] = value;
      }

      return updated;
    });
  };

  const addRow = (field) => {
    const newRowMap = {
      fees: { category: '', amount: '' },
      importantDates: { notificationDate: '', startDate: '', lastDate: '' },
      documentDetails: '',
      Qualification: ''
    };
    setJobDetails((prev) => ({
      ...prev,
      [field]: [...prev[field], newRowMap[field]]
    }));
  };

  const removeRow = (field, index) => {
    setJobDetails((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiCall = isEditMode
        ? axios.put(APIGovtJobs.getJobDetails, jobDetails)
        : axios.post(APIGovtJobs.createJob, jobDetails);

      await apiCall;
      setMessage({ type: 'success', text: isEditMode ? 'Job successfully updated!' : 'Job successfully created!' });
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error processing job details.' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit} className="popup-form">
          <h1>{isEditMode ? 'Edit Job Post' : 'Create Job Post'}</h1>

          {/* Basic Fields */}
          {[
            { label: "Post Name", field: "postName", type: "text" },
            { label: "Organization", field: "organization", type: "text" },
            { label: "Total vacancy", field: "vacancy", type: "number" },
            { label: "Salary", field: "salary", type: "text" }
          ].map(({ label, field, type }) => (
            <div className="form-group" key={field}>
              <label>{label}</label>
              <input
                type={type}
                value={jobDetails[field]}
                onChange={(e) => handleChange(e, field)}
                placeholder={`Enter ${label.toLowerCase()}`}
                required
              />
            </div>
          ))}

          {/* Important Dates */}
          <h2>Important Dates</h2>
          {jobDetails.importantDates.map((date, index) => (
            <div key={index} className="form-row">
              {["notificationDate", "startDate", "lastDate"].map((name) => (
                <React.Fragment key={name}>
                  <label>{name.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    name={name}
                    type="date"
                    value={date[name] || ""}
                    onChange={(e) => handleChange(e, "importantDates", index)}
                    required
                  />
                </React.Fragment>
              ))}
              <button type="button" onClick={() => removeRow("importantDates", index)} className="remove-button">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addRow("importantDates")} className="add-button">Add Important Date</button>

          {/* Fees */}
          <h2>Application Fee</h2>
          {jobDetails.fees.map((fee, index) => (
            <div key={index} className="form-row">
              {["category", "amount"].map((name) => (
                <input
                  key={name}
                  name={name}
                  type={name === "amount" ? "number" : "text"}
                  placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                  value={fee[name]}
                  onChange={(e) => handleChange(e, 'fees', index)}
                  required
                />
              ))}
              <button type="button" onClick={() => removeRow('fees', index)} className="remove-button">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addRow("fees")} className="add-button">Add Fee</button>

          {/* Age Limit */}
          <h2>Age Limit</h2>
          <div className="form-row">
            {["min", "max", "relaxation"].map((name) => (
              <input
                key={name}
                type={name === "relaxation" ? "text" : "number"}
                name={name}
                placeholder={name.charAt(0).toUpperCase() + name.slice(1) + " Age"}
                value={jobDetails.ageLimit[name]}
                onChange={(e) => handleChange(e, 'ageLimit')}
                required={name !== "relaxation"}
              />
            ))}
          </div>

          {/* Location and Selection Process */}
          <div className="form-row">
            <label>Job Location:</label>
            <input
              type="text"
              name="location"
              value={jobDetails.jobLocation.location}
              required
              onChange={(e) => setJobDetails((prev) => ({
                ...prev,
                jobLocation: { ...prev.jobLocation, location: e.target.value }
              }))}
            />
          </div>

          <div className="form-row">
            <label>Selection Process:</label>
            <input
              type="text"
              name="selectionProcess"
              value={jobDetails.selectionProcess}
              onChange={(e) => handleChange(e, 'selectionProcess')}
            />
          </div>

          {/* Documents */}
          <div className="form-row">
            <h2>Needed Documents</h2>
            {jobDetails.documentDetails.map((doc, index) => (
              <div key={index} className="document-row">
                <input
                  type="text"
                  placeholder="Enter document name"
                  value={doc}
                  required
                  onChange={(e) => handleChange(e, 'documentDetails', index)}
                />
                <button type="button" onClick={() => removeRow('documentDetails', index)} className="remove-button">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addRow('documentDetails')} className="add-button">Add Document</button>
          </div>

          {/* Qualification */}
          <div className="form-row">
            <h2>Qualification</h2>
            {jobDetails.Qualification.map((qualification, index) => (
              <div key={index} className="input-row">
                <input
                  type="text"
                  placeholder="Enter Qualification"
                  value={qualification}
                  required
                  onChange={(e) => handleChange(e, 'Qualification', index)}
                />
                <button type="button" onClick={() => removeRow('Qualification', index)} className="remove-button">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addRow('Qualification')} className="add-button">+ Add Qualification</button>
          </div>

          {/* Links */}
          {[
            { label: "official notification link", field: "officialPdfLink" },
            { label: "Website link", field: "websiteLink" }, 
            { label: "Admit card", field: "admitcard" }
          ].map(({ label, field }) => (
            <div className="form-group" key={field}>
              <label>{label}</label>
              <input
                type="text"
                value={jobDetails[field]}
                onChange={(e) => handleChange(e, field)}
                placeholder={`Enter ${label}`}
              
              />
            </div>
          ))}

          {/* Submit */}
          <button type="submit" className="submit-button">
            {isEditMode ? 'Update Job Post' : 'Submit Job Post'}
          </button>

          {/* Message */}
          {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
        </form>
      </div>
    </div>
  );
}

export default CreateJobPopup;
