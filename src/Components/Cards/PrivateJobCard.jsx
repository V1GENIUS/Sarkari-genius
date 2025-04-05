import React from 'react';
import './PrivateJobCard.css';
import { useNavigate } from "react-router-dom";

function PrivateJobCard({ job }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pri-detail/${job._id}`); // Use _id instead of id
  };

  return (
    <div className="PrivateJobCard" onClick={handleCardClick}>
      <div className="PrivateJobHeading">
        <h1>{job.JobDegination}</h1>
        <h6>Date: {new Date(job.createdAt).toLocaleDateString()}</h6>
      </div>
      <div className="PrivateJobName">
        <h3>{job.organization}</h3>
        <button>
          <b>Read More..</b>
        </button>
      </div>
    </div>
  );
}

export default PrivateJobCard;
