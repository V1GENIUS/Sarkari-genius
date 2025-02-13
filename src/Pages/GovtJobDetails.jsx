import React, { useEffect, useState } from "react";
import "./GovtJobDetails.css";
import Navbar from "../Components/Nav and footer/Navbar";
import Footer from "../Components/Nav and footer/Footer";
import axios from "axios"; 
import { useParams } from "react-router-dom"; 
import APIGovtJobs from '../Components/Api/ApiGovtJobs.js'
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import  Whatsappicon from '../Components/Images/whatsapp.png';

function GovtJobDetails() {
  const [jobDetails, setJobDetails] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { id } = useParams();
 

  useEffect(() => {
  
    axios
      .get(APIGovtJobs.getJobDetails(id))
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
    const jobLink = `${window.location.origin}/job-detail/${id}`; 
    return `
     ${jobDetails.vacancy } भर्ती एव आवेदन!
  *Organization* : ${jobDetails.organization }
  *Post Name* : ${jobDetails.postName }
  *Vacancies* : ${jobDetails.vacancy }
  *Start Date* : ${
      jobDetails.importantDates?.length > 0
        ? jobDetails.importantDates.map((date) => formatDate(date.startDate)).join(", ")
        : "N/A"
    }
  *Last Date* : ${
      jobDetails.importantDates?.length > 0
        ? jobDetails.importantDates.map((date) => formatDate(date.lastDate)).join(", ")
        : "N/A"
    }
  *Salary* : ${jobDetails.salary || "N/A"}
  *Age Limit* : ${
      jobDetails.ageLimit
        ? `${jobDetails.ageLimit.min}-${jobDetails.ageLimit.max} years`
        : "N/A"
    }
  *Selection Process* : ${jobDetails?.selectionProcess || "N/A"}
  *Job Location* : ${jobDetails.jobLocation?.location || "N/A"}
 *Qualification* : ${Array.isArray(jobDetails?.Qualification) 
  ? jobDetails.Qualification.join(", ") 
  : jobDetails?.Qualification || 'N/A'}
  *Job Details Link* : ${jobLink}
    `;
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
      <Navbar />
      <div className="job_details">
        <div className="job_page">
          <SpeedInsights/>
          <Analytics/>
          <div className="group-card whatsapp-card">
            <a
              className="seoquake-nofollow"
              href="https://chat.whatsapp.com/HzeBiz5nuqY6XJnSh89C1e"
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

        

    {/* </div> */}
          <div className="job_title">{jobDetails?.postName}</div>
         
          <div className="organization">{jobDetails?.organization }</div>

          <div className="post_name">POST NAME: {jobDetails?.postName || ""}</div>


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
                  <td>{jobDetails?.selectionProcess}</td>
            </tr>
            <tr>
                  <td>Job Location</td>
                  <td>{jobDetails?.jobLocation?.location || "N/A"}</td>
            </tr>
            <tr>
  <td>Qualification</td>
  <td>
    {Array.isArray(jobDetails?.Qualification) ? (
      jobDetails.Qualification.map((docs, index) => (
        <li key={index}>{docs}</li>
      ))
    ) : (
      <li>{jobDetails?.Qualification || 'N/A'}</li>  // Fallback if it's not an array
    )}
  </td>
</tr>

            <tr>
            <td>Documents</td>
            <td>
              
                {jobDetails?.documentDetails?.map((doc, index) =>
                 (
                  <li key={index}>{doc}</li>
                ))}
              
            </td>
          </tr>
{/* 
            <tr>
              <td>Apply Online</td>
              <td> <button className="apply-button" onClick={() => setShowForm(true)}>Open Form</button></td>

              {showForm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>Fill Out the Request For Form Filling</h2>
                  <form onSubmit={ handleInquirySubmit}>
                    <div>
                      <label>
                        Name:
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChangeInquiry}
                          required
                        />
                      </label>
                    </div>
                  
                    <div>
                      <label>
                        Mobile Number:
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChangeInquiry}
                          required
                        />
                      </label>
                    </div>

                    
                    <div>
                      <label>
                        Job Details:
                        <input
                          type="text"
                          name="jobDetails"
                          value={formData.jobDetails}
                          onChange={handleChangeInquiry}
                          required
                        />
                      </label>
                    </div>
                    <h2>Are you located in Indore?</h2>
            <div>
              <label>
                <input
                  type="radio"
                  name="location"
                  value="Yes"
                  // checked={response === "Yes"}
                  // onChange={handleChange}
                />
                Yes
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="location"
                  value="No"
                  // checked={response === "No"}u
                  // onChange={handleChange}
                />
                No
              </label>
            </div>

                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="agree"
                          checked={formData.agree}
                          onChange={handleChangeInquiry}
                        />
                        I agree to the terms and conditions
                      </label>
                    </div>
                    <div>
                      <button type="submit">Submit</button>
                      <button type="button" onClick={() => setShowForm(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
                  
            </tr> */}
            <tr>
            <td>Apply Online</td>
            <td>  <a className="apply-button" href="https://docs.google.com/forms/d/e/1FAIpQLSdpNooX5zIUvk2YdFglC79ufFaOUkIwXfqZmdSqX1ZRt6K4qw/alreadyresponded" target="_blank" rel="noopener noreferrer">
      Open  Form
    </a></td>

            </tr>
            <tr>
              <td>official Notification Details</td>
              <td>
                {jobDetails?.officialPdfLink ? (
                  <a 
                    href={jobDetails.officialPdfLink} 
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
              <td>Official Website</td>
            
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
