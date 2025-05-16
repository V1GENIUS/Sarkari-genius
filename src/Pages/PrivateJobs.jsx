import './PrivateJobs.css';
import { React, useNavigate, useEffect, useState } from '../import.js';
import { Footer, Navbar } from '../import.js';
import PrivateJobCard from '../Components/Cards/PrivateJobCard.jsx';
import All_api from '../Components/Api/All_api.js';

function PrivateJobs() {
  const [prijobs, setpriJobs] = useState([]);
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

    // Fetch jobs from the API
    fetch(All_api.APIPrivateJobs.getAllPrivateJobs)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.jobs)) {
          setpriJobs(data.jobs);  // Set the jobs array to state
        } else {
          console.error('Fetched data does not contain an array of jobs:', data);
        }
      })
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="private-section">
        <h3>
          We provide <span className="highlight">Technical</span> and <span className="highlight">Non-Tech</span> jobs
          <br /><br />
          For <b>Experienced</b> candidates or <b>Freshers</b>.
        </h3>

        <div className="private-cards">
          {/* Ensure prijobs is an array before attempting to map */}
          {Array.isArray(prijobs) && prijobs.length > 0 ? (
            [...prijobs].reverse().map((job) => (
              <PrivateJobCard key={job._id} job={job} />
            ))
          ) : (
            <p>No jobs available at the moment.</p>  // Message if no jobs are available
          )}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default PrivateJobs;
