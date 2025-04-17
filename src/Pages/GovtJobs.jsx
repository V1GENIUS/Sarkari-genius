import React, { useEffect, useState,useNavigate } from '../import';
import './GovtJobs.css';
import  { Navbar, Footer} from '../import';
import GovtJobCard from '../Components/GovtJobCard';
import APIGovtJobs from "../Components/Api/ApiGovtJobs";

function GovtJobs() {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    if (token && name) {
      setUser({ name, role });
    } else {
      setUser(null);
    }
    fetch(APIGovtJobs.getAllJobs)
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  const handleCardClick = (job) => {
    navigate(`/job-detail/${job.id}`, { state: { job } });
  };

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="govtSection_1">
        <h1>Sarkari Job Vacancy</h1>
        <h3>
          We provide MPSC | SSC | Railway | Govt schemes Job Vacancy News
          <br /> <br />
          With <b>Form Filling Home Services</b>.
        </h3>
      </div>
      <div className="govt_cards">
        {[...jobs].reverse().map((job) => (
          <GovtJobCard key={job.id} job={job} onClick={() => handleCardClick(job)} />
        ))}

      </div>
      <Footer />
    </>
  );
}

export default GovtJobs;
