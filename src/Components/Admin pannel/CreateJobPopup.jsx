import React, { useState , useEffect } from 'react';
import axios from 'axios';
import './CreateJobPopup.css';

function CreateJobPopup({ jobData,isVisible, onClose,isEditMode ,jobId }) {

  const [jobDetails, setJobDetails] = useState({
    postName: '',
    organization: '',
    vacancy:'',
    salary:'',
    importantDates: [{notificationDate: '', startDate: '',lastDate:'' }],
    fees: [{ category: '', amount: '' }],
    ageLimit: {
      min: '',
      max: '',
      relaxation: '',
    },
    selectionProcess:'',
    Qualification:{eligibility:'',Note:''},
    jobLocation: { location: '' },
    documentDetails:'',
    applyLink: '',
    officialPdfLink: '',
    websiteLink:''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  
  useEffect(() => {
    if (isEditMode && jobData) {
      setJobDetails(jobData);
    }
  }, [jobData, isEditMode]);
  const handleChange = (e, field, index) => {
    const { name, value, type, checked } = e.target;
    const updatedDetails = { ...jobDetails };

    if (['fees', 'importantDates', ].includes(field)) {
      updatedDetails[field][index][name] = type === 'checkbox' ? checked : value;
    } else if (field === 'ageLimit') {
      updatedDetails.ageLimit[name] = value;
    } else {
      updatedDetails[field] = value;
    }

    setJobDetails(updatedDetails);
  };



  const addRow = (field) => {
    const updatedDetails = { ...jobDetails };
    const newRow = {
      fees: { category: '', amount: '' },
      selection: { process: '' },
      jobLocation: { location: '' },
      importantDates: { notificationDate: '', startDate: '', lastDate: '' },
    };

    updatedDetails[field].push(newRow[field]);
    setJobDetails(updatedDetails);
  };

  const removeRow = (field, index) => {
    const updatedDetails = { ...jobDetails };
    updatedDetails[field].splice(index, 1);
    setJobDetails(updatedDetails);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`https://sarkari-genius.onrender.com/api/jobs/${jobId}`, jobDetails, {
          headers: { 'Content-Type': 'application/json' },
        });
        setMessage({ type: 'success', text: 'Job successfully updated!' });
      } else {
        await axios.post('https://sarkari-genius.onrender.com/api/jobs/create', jobDetails, {
          headers: { 'Content-Type': 'application/json' },
        });
        setMessage({ type: 'success', text: 'Job successfully created!' });
      }

      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage({
        type: 'error',
        text: error.response ? error.response.data.message : 'Error processing job details.',
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
        <h1>{isEditMode ? 'Edit Job Post' : 'Create Job Post'}</h1>
         

          <div className="form-group">
            <label>Post Name</label>
            <input
              type="text"
              value={jobDetails.postName}
              onChange={(e) => handleChange(e, 'postName')}
              placeholder="Enter post name"
              required
            />
          </div>
          <div className="form-group">
            <label>Organization</label>
            <input
              type="text"
              value={jobDetails.organization}
              onChange={(e) => handleChange(e, 'organization')}
              placeholder="Enter organization name"
              required
            />
          </div>
          <div className="form-group">
            <label>Total vacancy</label>
            <input
              type="number"
              value={jobDetails.vacancy}
              onChange={(e) => handleChange(e, 'vacancy')}
              placeholder="Enter total vacancy"
              required
            />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              type="text"
              value={jobDetails.salary}
              onChange={(e) => handleChange(e, 'salary')}
              placeholder="Enter salary"
              required
            />
          </div>

          <h2>Important Dates</h2>
            {jobDetails.importantDates.map((date, index) => (
              <div key={index} className="form-row">
                <label>Notification Date</label>
                <input
                  name="notificationDate"
                  type="date"
                  placeholder="Notification Date"
                  value={date.notificationDate || ""}
                  onChange={(e) => handleChange(e, "importantDates", index, "notificationDate")}
                  required
                />
                <label>Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  placeholder="Start Date"
                  value={date.startDate || ""}
                  onChange={(e) => handleChange(e, "importantDates", index, "startDate")}
                  required
                />
                <label>Last Date</label>
                <input
                  name="lastDate"
                  type="date"
                  placeholder="Last Date"
                  value={date.lastDate || ""}
                  onChange={(e) => handleChange(e, "importantDates", index, "lastDate")}
                  required
                />
                <button type="button" onClick={() => removeRow("importantDates", index)} className="remove-button">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addRow("importantDates")} className="add-button">
              Add Important Date
            </button>


          <h2>Application Fee</h2>
          {jobDetails.fees.map((fee, index) => (
            <div key={index} className="form-row">
              <input
                name="category"
                type="text"
                placeholder="Category"
                value={fee.category}
                onChange={(e) => handleChange(e, 'fees', index)}
                required
              />
              <input
                name="amount"
                type="number"
                placeholder="Amount"
                value={fee.amount}
                onChange={(e) => handleChange(e, 'fees', index)}
                required
              />
              <button type="button" onClick={() => removeRow('fees', index)} className="remove-button">
                Remove
              </button>
            </div>
          ))}
           <button type="button" onClick={() => addRow("fees")} className="add-button">
              Add fee
            </button>

          <h2>Age Limit</h2>
          <div className="form-row">
            <input
              type="number"
              name="min"
              placeholder="Min Age"
              value={jobDetails.ageLimit.min}
              onChange={(e) => handleChange(e, 'ageLimit')}
              required
            />
            <input
              type="number"
              name="max"
              placeholder="Max Age"
              value={jobDetails.ageLimit.max}
              onChange={(e) => handleChange(e, 'ageLimit')}
              required
            />
            <input
              type="text"
              name="relaxation"
              placeholder="Relaxation"
              value={jobDetails.ageLimit.relaxation}
              onChange={(e) => handleChange(e, 'ageLimit')}
            />
          </div>

          <div className="form-row">
            <label>Job Location:</label>
            <input
              type="text"
              name="location"
              value={jobDetails.jobLocation.location}
              required
              onChange={(e) =>
                setJobDetails((prev) => ({
                  ...prev,
                  jobLocation: { ...prev.jobLocation, location: e.target.value },
                }))
              }
            />
          </div>

          <div className="form-row">
            <label>Selection Process:</label>
            <input
              type="text"
              name="process"
              value={jobDetails.selectionProcess}
              onChange={(e) =>handleChange(e, 'selectionProcess')
                
              }
            />
          </div>

          <div className="form-group">
            <label>needed document</label>
            <input
              type="text"
              value={jobDetails.documentDetails}
              onChange={(e) => handleChange(e, 'documentDetails')}
              placeholder="Enter document details"
              required
            />
          </div>
        

          <div className="form-group">
            <label>Apply link</label>
            <input
              type="text"
              value={jobDetails.applyLink}
              onChange={(e) => handleChange(e, 'applyLink')}
              placeholder="Enter apply link Link"
              required
            />
          </div>
          <div className="form-group">
            <label>official notification link</label>
            <input
              type="text"
              value={jobDetails.officialPdfLink}
              onChange={(e) => handleChange(e, 'officialPdfLink')}
              placeholder="Enter official pdf Link"
              required
            />
          </div>
          <div className="form-group">
            <label>Website link</label>
            <input
              type="text"
              value={jobDetails.websiteLink}
              onChange={(e) => handleChange(e, 'websiteLink')}
              placeholder="Enter website Link"
              required
            />
          </div>
        
          <button type="submit" className="submit-button">
            {isEditMode ? 'Update Job Post' : 'Submit Job Post'}
          </button>
          {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

          {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
        </form>
      </div>
    </div>
  );
}

export default CreateJobPopup;
