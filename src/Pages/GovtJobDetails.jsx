import React, { useEffect, useState } from '../import.js';
import { useNavigate, useParams, axios } from '../import.js';
import "./GovtJobDetails.css";
import { Navbar, Footer, LoadingSpinner } from '../import.js';
import APIGovtJobs from '../Components/Api/ApiGovtJobs.js';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Whatsappicon from '../Components/Images/whatsapp.png';

function GovtJobDetails() {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitMessage, setSubmitMessage] = useState('');
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    whatsapp: '',
    address: '',
    jobDetails: '',
    agree: false
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    token && name ? setUser({ name, role }) : setUser(null);

    axios.get(APIGovtJobs.getJobDetails(id))
      .then((res) => {
        const job = res.data;
        setJobDetails(job);
        setFormData(prev => ({ ...prev, jobDetails: job.postName }));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details");
        setLoading(false);
      });
  }, [id]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(APIGovtJobs.submitGovtRequestForm, formData);
      setSubmitMessage("Form submitted successfully.");
      setShowForm(false);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitMessage("Something went wrong. Please try again.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Invalid Date";
    try {
      const options = { day: "numeric", month: "long" };
      return new Intl.DateTimeFormat("en-GB", options).format(new Date(dateStr));
    } catch {
      return "Invalid Date";
    }
  };

  const generateWhatsAppMessage = () => {
    if (!jobDetails) return "";
    const jobLink = `${window.location.origin}/job-detail/${id}`;
    return `
*${jobDetails.postName} भर्ती एव आवेदन!*
--------------------------------
*Organization* : ${jobDetails.organization}
*Post Name* : ${jobDetails.postName}
*Vacancies* : ${jobDetails.vacancy}
*Start Date* : ${jobDetails.importantDates?.map(d => formatDate(d.startDate)).join(", ") || "N/A"}
*Last Date* : ${jobDetails.importantDates?.map(d => formatDate(d.lastDate)).join(", ") || "N/A"}
*Salary* : ${jobDetails.salary || "N/A"}
*Age Limit* : ${jobDetails.ageLimit ? `${jobDetails.ageLimit.min}-${jobDetails.ageLimit.max} years` : "N/A"}
*Selection Process* : ${jobDetails.selectionProcess || "N/A"}
*Job Location* : ${jobDetails.jobLocation?.location || "N/A"}
*Qualification* : ${Array.isArray(jobDetails.Qualification) ? jobDetails.Qualification.join(", ") : jobDetails.Qualification || "N/A"}
*Job Details Link* : ${jobLink}
-------------------------------
______________________________
    `;
  };

  const handleShareOnWhatsApp = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const isValidUrl = (url) => {
    try {
      return Boolean(new URL(url));
    } catch (e) {
      return false;
    }
  };

  if (loading) return <LoadingSpinner loading={loading} />;
  if (error) return <div>Error: 404 {error} Contact to Admin</div>;

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="job_details">
        <div className="job_page">
          <SpeedInsights />
          <Analytics />

          {/* WhatsApp Channel Card */}
          <div className="group-card whatsapp-card">
            <a
              className="seoquake-nofollow"
              href="https://chat.whatsapp.com/HzeBiz5nuqY6XJnSh89C1e"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>WhatsApp Channel</span>
                <div className="join-now-container" style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: 'auto' }}>
                  <span className="join-now-text" style={{ marginRight: '10px' }}>Join Now</span>
                  <img src={Whatsappicon} alt="WhatsApp Icon" style={{ width: '24px', height: '24px' }} />
                </div>
              </span>
            </a>
          </div>

          {/* Job Header */}
          <div className="job_title">{jobDetails?.postName}</div>
          <div className="organization">{jobDetails?.organization}</div>
          <div className="post_name">POST NAME: {jobDetails?.postName}</div>

          {/* Job Info Table */}
          <div className="job-details-container">
            <table className="details-table">
              <tbody>
                <tr><td>Organization</td><td>{jobDetails.organization || "N/A"}</td></tr>
                <tr><td>Post Name</td><td>{jobDetails.postName || "N/A"}</td></tr>
                <tr><td>Vacancies</td><td>{jobDetails.vacancy || "N/A"}</td></tr>
                <tr>
                  <td style={{ color: 'green' }}>Start Date</td>
                  <td>{jobDetails.importantDates?.map((d, i) => (
                    <div key={i} style={{ color: 'green' }}>{formatDate(d.startDate)}</div>
                  )) || <span>No Dates Available</span>}</td>
                </tr>
                <tr>
                  <td style={{ color: 'red' }}>Last Date</td>
                  <td>{jobDetails.importantDates?.map((d, i) => (
                    <div key={i} style={{ color: 'red' }}>{formatDate(d.lastDate)}</div>
                  )) || <span style={{ color: 'red' }}>No Dates Available</span>}</td>
                </tr>
                <tr><td>Salary</td><td>{jobDetails.salary || "N/A"}</td></tr>
                <tr>
                  <td>Application Fee</td>
                  <td>
                    {jobDetails.fees?.map((fee, i) => (
                      <div key={i} style={{ color: 'green' }}>
                        <b>{fee.category || "General"} -: {fee.amount || 0}/-</b>
                      </div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Age Limit</td>
                  <td>
                    {jobDetails.ageLimit ? (
                      <>
                        {jobDetails.ageLimit.min} - {jobDetails.ageLimit.max} years
                        {jobDetails.ageLimit.relaxation && (
                          <div><strong>Relaxation:</strong> {jobDetails.ageLimit.relaxation}</div>
                        )}
                      </>
                    ) : "No Age Limit Information Available"}
                  </td>
                </tr>
                <tr><td>Selection Process</td><td>{jobDetails.selectionProcess}</td></tr>
                <tr><td>Job Location</td><td>{jobDetails.jobLocation?.location || "N/A"}</td></tr>
                <tr>
                  <td>Qualification</td>
                  <td>
                    {Array.isArray(jobDetails.Qualification)
                      ? jobDetails.Qualification.map((q, i) => <li key={i}>{q}</li>)
                      : <li>{jobDetails.Qualification || "N/A"}</li>}
                  </td>
                </tr>
                <tr>
                  <td>Documents</td>
                  <td>{jobDetails.documentDetails?.map((doc, i) => <li key={i}>{doc}</li>)}</td>
                </tr>
                <tr>
                  <td>Apply Online</td>
                  <td><button className="apply-button" onClick={() => setShowForm(true)}>Open Form</button></td>
                </tr>
                <tr>
                  <td>Official Notification</td>
                  <td>{jobDetails.officialPdfLink
                    ? <a href={jobDetails.officialPdfLink} target="_blank" rel="noopener noreferrer" className="table-link">Click Here</a>
                    : "No Link Available"}</td>
                </tr>
                <tr>
                  <td>Official Website</td>
                  <td>{jobDetails.websiteLink
                    ? <a href={jobDetails.websiteLink} target="_blank" rel="noopener noreferrer" className="table-link">Click Here</a>
                    : "No Link Available"}</td>
                </tr>

                <tr>
  <td>Admit Card</td>
  <td>
    {isValidUrl(jobDetails.admitcard) ? (
      <a
        href={jobDetails.admitcard}
        target="_blank"
        rel="noopener noreferrer"
        className="table-link"
      >
        Click Here
      </a>
    ) : (
      "Soon Activate Link"
    )}
  </td>
</tr>


              </tbody>
            </table>

            <button className="whatsapp-share-button" onClick={handleShareOnWhatsApp}>
              Share on WhatsApp
            </button>

            {/* Modal Form */}
            {showForm && (
              <div className="modal-overlay">
                <div className="modal-content" style={{ position: 'relative' }}>
                  <button
                    className="modal-close-button"
                    onClick={() => setShowForm(false)}
                    style={{ position: 'absolute', top: 10, right: 10, fontSize: 20, background: 'transparent', border: 'none', cursor: 'pointer', color: '#888' }}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <h2>Fill Out the Request Form</h2>
                  <p style={{ color: "red", fontWeight: "bold" }}>Are you sure you want to fill this form? A minimum charge of ₹70 will apply.</p>

                  <form onSubmit={handleFormSubmit}>
                    {["name", "email", "mobile", "whatsapp", "address"].map((field) => (
                      <div key={field}>
                        <label>
                          {field[0].toUpperCase() + field.slice(1)}:
                          {field === "address" ? (
                            <textarea name={field} rows="3" required value={formData[field]} onChange={handleChange} />
                          ) : (
                            <input type={field === "email" ? "email" : "text"} name={field} required value={formData[field]} onChange={handleChange} />
                          )}
                        </label>
                      </div>
                    ))}

                    <div>
                      <label>
                        Job Details:
                        <input type="text" name="jobDetails" readOnly value={formData.jobDetails} />
                      </label>
                    </div>

                    <div>
                      <label>
                        <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} required />
                        I accept the terms and conditions
                      </label>
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                      <button type="submit">Submit</button>
                      <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: "10px" }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GovtJobDetails;
