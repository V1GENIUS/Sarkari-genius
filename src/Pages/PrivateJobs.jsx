import './PrivateJobs.css';
import { React,useNavigate ,useEffect, useState } from '../import.js'
import { Footer,Navbar } from '../import.js'
import PrivateJobCard from '../Components/Cards/PrivateJobCard.jsx';
import APIPrivateJobs from "../Components/Api/ApiPrivateJobs.js";

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
    fetch(APIPrivateJobs.getAllPrivateJobs)
      .then((response) => response.json())
      .then((data) => setpriJobs(data))
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
          {[...prijobs].reverse().map((job) => (
            <PrivateJobCard key={job._id} job={job} />
          ))}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default PrivateJobs;
