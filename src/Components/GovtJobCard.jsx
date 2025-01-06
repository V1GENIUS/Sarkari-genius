import React from 'react';
import './GovtJobCard.css';
import { useNavigate } from "react-router-dom";

function GovtJobCard({ job}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job-detail/${job._id}`); // Use the job ID to navigate
  };
  return (
    <div className="GovtJobCard" onClick={handleCardClick}>
      <div className="GovtJobHeading">
        <h1>{job.postName}</h1>
        <h6>Date: {new Date(job.createdAt).toLocaleDateString()}</h6>
      </div>
      <div style={{ display: 'flex' }}>
        
        <div className="GovtJobName">
          <h3>{job.organization}</h3>
          <button>
            <b>Read More..</b>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GovtJobCard;
