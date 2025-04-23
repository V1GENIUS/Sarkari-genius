import React, { useEffect, useState ,useNavigate, useParams ,axios} from '../import.js';
import "./PrivateJobDetails.css";
import { Navbar ,Footer ,LoadingSpinner} from '../import.js';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import  Whatsappicon from '../Components/Images/whatsapp.png';
import All_api from '../Components/Api/All_api.js';

function PrivatePrijobDetails() {
  const [PrijobDetails, setPriJobDetails] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { id } = useParams();
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

    
    axios
  .get(All_api.APIPrivateJobs.getPrivateJobDetails(id))
  .then((response) => {
    // console.log("API Response:", response.data);

    if (response.data?.job) {  
      setPriJobDetails(response.data.job);
    } else {
      setError("No job data found");
    }
    setLoading(false);
  })
  .catch((err) => {
    console.error("Error fetching job details:", err);
    setError("Failed to load job details");
    setLoading(false);
  });
  }, [id]);

  const generateWhatsAppMessage = () => {
    if (!PrijobDetails) return "";
    const jobLink = `${window.location.origin}/pri-detail/${id}`; 
    return `*${PrijobDetails.organization }* is *Hiring*
  --------------------------------

  *Organization* : ${PrijobDetails.organization }
  *Role* : ${PrijobDetails.JobDegination }
  *Salary* : ${PrijobDetails.salary }
  *experience* : ${PrijobDetails.experience || "N/A"}
  *Batch* : ${PrijobDetails?.batch || "N/A"}
  *Qualification* : ${PrijobDetails.Qualification || "N/A"}
 *Job Location* : ${PrijobDetails.location || "N/A"}

  *ApplyLink* : ${jobLink}
  -------------------------------
  *Join Link* : https://chat.whatsapp.com/EJAEtd9n0JZLAaVpbxuY61
  _____________________________
  *Telegram Link* : https://t.me/sarkarigeniusfresher`;
  };
  
  const handleShareOnWhatsApp = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  if (loading) {
    return<LoadingSpinner loading={loading} />; 
  }
  if (error) {
    return <div>Error: 404 {error} Contact to Admin</div>; 
  }

  return (
    <>
<div>
<Navbar  user={user} handleLogout={handleLogout} />
      <div className="job_details">
        <div className="job_page">
          <SpeedInsights/>
          <Analytics/>
          <div className="group-card whatsapp-card">
            <a
              className="seoquake-nofollow"
              href="https://chat.whatsapp.com/EJAEtd9n0JZLAaVpbxuY61"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
            <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                WhatsApp Channel
              </span>
      
              <div className="join-now-container" style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: 'auto' }}>
                <span className="join-now-text" style={{ marginRight: '10px' }}>Join Now</span>
                <img 
                  src={Whatsappicon} 
                  alt="WhatsApp Icon" 
                  style={{ width: '24px', height: '24px' }} 
                />
              </div>
            </span>
            </a>
          </div>
        
          <div className="organization">{PrijobDetails?.organization }</div>
          <div className="post_name">JOB DESIGNATION: {PrijobDetails?.JobDegination || ""}</div>


<div className="job-details-container">
       
        <table className="details-table">
          <tbody>
            <tr>
              <td>Organization</td>
              <td style={{color:'Green'}}>{PrijobDetails?.organization || "N/A"}</td>
            </tr>
            <tr>
              <td>Job Deginatation</td>
              <td>{PrijobDetails?.JobDegination || "N/A"}</td>
            </tr>
            <tr>
              <td>Salary</td>
              <td>{PrijobDetails?.salary || ""}</td>
            </tr>
            <tr>
              <td>Experience</td>
              <td>{PrijobDetails?.experience || "N/A"}</td>
            </tr>
            <tr>
                  <td>Batch</td>
                  <td>{PrijobDetails?.batch}</td>
            </tr>
            <tr>
                  <td>Qualification</td>
                  <td>{PrijobDetails?.Qualification|| "N/A"}</td>
            </tr>
            <tr>
                  <td>Job Location</td>
                  <td>{PrijobDetails?.location|| "N/A"}</td>
            </tr>
            <tr>
              <td>Apply Link</td>
            
              <td>
                {PrijobDetails?.applyLink ? (
                  <a 
                    href={PrijobDetails.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="table-link"
                  >
                    Click Here
                  </a>
                ) : (
                  "No Link Available"
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <button className="whatsapp-share-button" onClick={handleShareOnWhatsApp}>
            Share on WhatsApp
          </button>
      </div>

     

        </div>
      </div>
      <Footer />
    </div>

    
    </>
  );
}

export default PrivatePrijobDetails;
