import React, { useEffect, useState } from "react";
import "./GovtJobDetails.css";
import Navbar from "../Components/Nav and footer/Navbar";
import Footer from "../Components/Nav and footer/Footer";
import axios from "axios"; 
import { useParams } from "react-router-dom"; 

function GovtJobDetails() {
  const [jobDetails, setJobDetails] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
  
    axios
      .get(`https://sarkari-genius.vercel.app/api/jobs/${id}`)
      .then((response) => {
        setJobDetails(response.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details");
        setLoading(false);
      });
  }, [id]);


  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"; 
    try {
      const options = { day: "numeric", month: "long" };
      const date = new Date(dateString); 
      return new Intl.DateTimeFormat("en-GB", options).format(date);
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Invalid Date"; 
    }
  };
  



  const generateWhatsAppMessage = () => {
    if (!jobDetails) return "";
    return `
*Job Details*
Organization: ${jobDetails.organization }
Post Name: ${jobDetails.postName }
Vacancies: ${jobDetails.vacancy }
Start Date: ${
      jobDetails.importantDates?.length > 0
        ? jobDetails.importantDates.map((date) => formatDate(date.startDate)).join(", ")
        : "N/A"
    }
Last Date: ${
      jobDetails.importantDates?.length > 0
        ? jobDetails.importantDates.map((date) => formatDate(date.lastDate)).join(", ")
        : "N/A"
    }
Salary: ${jobDetails.salary || "N/A"}
Age Limit: ${
      jobDetails.ageLimit
        ? `${jobDetails.ageLimit.min}-${jobDetails.ageLimit.max} years`
        : "N/A"
    }
Selection Process: ${jobDetails.selection?.process || "N/A"}
Job Location: ${jobDetails.jobLocation?.location || "N/A"}
Qualification: ${jobDetails.status || "N/A"}
Apply Online: ${jobDetails.websiteLink || "N/A"}
Official Notification: ${jobDetails.websiteLink || "N/A"}
    `;
  };

  const handleShareOnWhatsApp = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, "_blank");
  };


  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: 404 {error} Contact to Admin</div>; 
  }

  return (
    <>
<div>
      <Navbar />
      <div className="job_details">
        <div className="job_page">
          <h1 className="job_title">{jobDetails?.postName}</h1>
         
          <h3 className="organization">{jobDetails?.organization }</h3>

          <h3 className="post_name">POST NAME: {jobDetails?.postName || ""}</h3>


<div className="job-details-container">
       
        <table className="details-table">
          <tbody>
            <tr>
              <td>Organization</td>
              <td>{jobDetails?.organization || "N/A"}</td>
            </tr>
            <tr>
              <td>Post Name</td>
              <td>{jobDetails?.postName || "N/A"}</td>
            </tr>
            <tr>
              <td>Vacancies</td>
              <td>{jobDetails?.vacancy || ""}</td>
            </tr>
            <tr>
              <td style={{color:'green'}}>Start Date</td>
              <td>
                {jobDetails?.importantDates?.length > 0 ? (
                  jobDetails.importantDates.map((date, index) => (
                    <div key={index} style={{ color: "green" }}>
                      <span>{formatDate(date.startDate)}</span>
                    </div>
                  ))
                ) : (
                  <span >No Dates Available</span>
                )}
              </td>
            </tr>
            <tr>
              <td style={{color:'red'}}>Last Date</td>
              <td>
                {jobDetails?.importantDates?.length > 0 ? (
                  jobDetails.importantDates.map((date, index) => (
                    <div key={index} style={{ color: "red" }}>
                      <span>{formatDate(date.lastDate)} </span>
                    </div>
                  ))
                ) : (
                  <span style={{ color: "red" }}>No Dates Available</span>
                )}
              </td>
              
            </tr>

            <tr>
              <td>Salary</td>
              <td>{jobDetails?.salary || "N/A"}</td>
            </tr>

            <tr >
                <td>Application Fee</td>
                <td >
                  <div >

                    {jobDetails.fees.map((fee, index) => (
                      <tr key={index}>
                        <div style={{display:'flex', textAlign:'center',color:'green'}}>
                        <b>{fee.category || "General"}
                        -: {fee.amount ? `${fee.amount}/-` : "N/A"}</b>
                        </div>
                      </tr>
                      ))}
                  </div>
                </td>
            </tr>

            <tr>
                <td>Age Limit</td>
                <td>
                  {jobDetails?.ageLimit ? (
                    <div >
                      {jobDetails.ageLimit.min } - {jobDetails.ageLimit.max } years
                      
                      {jobDetails.ageLimit.relaxation && (
                        <div>
                          <strong>Relaxation:</strong> {jobDetails.ageLimit.relaxation || "N/A"}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span>No Age Limit Information Available</span>
                  )}
                </td>
            </tr>
            <tr>
                  <td>Selection Process</td>
                  <td>{jobDetails?.selection?.process || "N/A"}</td>
            </tr>
            <tr>
                  <td>Job Location</td>
                  <td>{jobDetails?.jobLocation?.location || "N/A"}</td>
            </tr>
            <tr>
              <td>Qualification</td>
              <td>{jobDetails?.status }</td>
            </tr>
            <tr>
                  <td>Document Details</td>
                  <td>
                    <ul>
                      {jobDetails?.documentDetails?.length > 0 ? (
                        jobDetails.documentDetails.map((doc, index) => (
                          <li key={index}>
                            {doc.name}
                          </li>
                        ))
                      ) : (
                        <li>No Documents Available</li>
                      )}
                    </ul>
                  </td>
            </tr>

            {/* <table>
  <thead>
    <tr>
      <th>Link Name</th>
      <th>URL</th>
    </tr>
  </thead>
  <tbody>
    {jobDetails?.usefulLinks?.links && jobDetails.usefulLinks.links.length > 0 ? (
      jobDetails.usefulLinks.links.map((link, index) => (
        <tr key={index}>
          <td>{link.name || 'N/A'}</td>
          <td>
            {link.url ? (
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.text || 'Visit'}
              </a>
            ) : (
              'N/A'
            )}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="2">No links available</td>
      </tr>
    )}
  </tbody>
</table> */}
            <tr>
              <td>Apply Online</td>
              <td>
                {jobDetails?.websiteLink ? (
                  <a 
                    href={jobDetails.websiteLink} 
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
            <tr>
              <td>official Notification Details</td>
              <td>
                {jobDetails?.websiteLink ? (
                  <a 
                    href={jobDetails.websiteLink} 
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
            <tr>
              <td>Apply Online</td>
              <td>
                {jobDetails?.websiteLink ? (
                  <a 
                    href={jobDetails.websiteLink} 
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

export default GovtJobDetails;
