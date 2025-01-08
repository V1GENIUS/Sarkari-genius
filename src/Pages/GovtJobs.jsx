import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GovtJobs.css';
import Navbar from '../Components/Nav and footer/Navbar';
import Footer from '../Components/Nav and footer/Footer';
import GovtJobCard from '../Components/GovtJobCard';

function GovtJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://sarkari-genius.onrender.com/api/jobs') 
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  const handleCardClick = (job) => {
    navigate(`/job-detail/${job.id}`, { state: { job } });
  };

  return (
    <>
      <Navbar />
      <div className="govtSection_1">
        <h1>Sarkari Job Vacancy</h1>
        <h3>
          We provide MPSC | SSC | Railway | Govt schemes Job Vacancy News
          <br /> <br />
          With <b>Form Filling Home Services</b>.
        </h3>
      </div>
      <div className="govt_cards">
        {jobs.map((job) => (
          <GovtJobCard key={job.id} job={job} onClick={() => handleCardClick(job)} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default GovtJobs;
