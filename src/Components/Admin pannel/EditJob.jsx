import React, { useState, useEffect } from "react";
import axios from "axios";
import APIGovtJobs from "../Api/ApiGovtJobs";
import "./CreateJobPopup.css"; // Reuse the same CSS if applicable

function EditJob({ job, isVisible, onClose }) {
  const [jobDetails, setJobDetails] = useState({
    postName: "",
    organization: "",
    vacancy: "",
    salary: "",
    importantDates: [{ notificationDate: "", startDate: "", lastDate: "" }],
    fees: [{ category: "", amount: "" }],
    ageLimit: { min: "", max: "", relaxation: "" },
    selectionProcess: "",
    Qualification: [""],
    jobLocation: { location: "" },
    documentDetails: [""],
    officialPdfLink: "",
    websiteLink: ""
  });

  useEffect(() => {
    if (job) {
      setJobDetails({
        postName: job.postName || "",
        organization: job.organization || "",
        vacancy: job.vacancy || "",
        salary: job.salary || "",
        importantDates:
          job.importantDates && job.importantDates.length
            ? job.importantDates
            : [{ notificationDate: "", startDate: "", lastDate: "" }],
        fees:
          job.fees && job.fees.length
            ? job.fees
            : [{ category: "", amount: "" }],
        ageLimit: job.ageLimit || { min: "", max: "", relaxation: "" },
        selectionProcess: job.selectionProcess || "",
        Qualification:
          job.Qualification && job.Qualification.length
            ? job.Qualification
            : [""],
        jobLocation: job.jobLocation || { location: "" },
        documentDetails:
          job.documentDetails && job.documentDetails.length
            ? job.documentDetails
            : [""],
        officialPdfLink: job.officialPdfLink || "",
        websiteLink: job.websiteLink || ""
      });
    }
  }, [job]);

  // Generic handler for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Add and remove functions for array fields
  const addRow = (field) => {
    setJobDetails((prev) => {
      let newRow;
      switch (field) {
        case "importantDates":
          newRow = { notificationDate: "", startDate: "", lastDate: "" };
          break;
        case "fees":
          newRow = { category: "", amount: "" };
          break;
        case "Qualification":
          newRow = "";
          break;
        case "documentDetails":
          newRow = "";
          break;
        default:
          return prev;
      }
      return {
        ...prev,
        [field]: [...prev[field], newRow]
      };
    });
  };

  const removeRow = (field, index) => {
    setJobDetails((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

 
  const updateArrayField = (field, index, key, value) => {
    setJobDetails((prev) => {
      const newArray = [...prev[field]];
      if (typeof newArray[index] === "object") {
        newArray[index] = { ...newArray[index], [key]: value };
      } else {
        newArray[index] = value;
      }
      return { ...prev, [field]: newArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(APIGovtJobs.updateJob(job._id), jobDetails);
      console.log("Job updated successfully", response.data);
      alert("Job Updated Successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className="popup-form">
          <h1>Edit Job Post</h1>

          {/* Top-level fields */}
          <label>Post Name</label>
          <input
            type="text"
            name="postName"
            value={jobDetails.postName}
            onChange={handleChange}
            required
          />

          <label>Organization</label>
          <input
            type="text"
            name="organization"
            value={jobDetails.organization}
            onChange={handleChange}
            required
          />

          <label>Vacancy</label>
          <input
            type="number"
            name="vacancy"
            value={jobDetails.vacancy}
            onChange={handleChange}
            required
          />

          <label>Salary</label>
          <input
            type="text"
            name="salary"
            value={jobDetails.salary}
            onChange={handleChange}
            required
          />

          {/* Important Dates */}
          <h2>Important Dates</h2>
          {jobDetails.importantDates.map((date, index) => (
            <div key={index} className="form-row">
              <label>Notification Date</label>
              <input
                name="notificationDate"
                type="date"
                value={date.notificationDate || ""}
                onChange={(e) =>
                  updateArrayField("importantDates", index, "notificationDate", e.target.value)
                }
                required
              />
              <label>Start Date</label>
              <input
                name="startDate"
                type="date"
                value={date.startDate || ""}
                onChange={(e) =>
                  updateArrayField("importantDates", index, "startDate", e.target.value)
                }
                required
              />
              <label>Last Date</label>
              <input
                name="lastDate"
                type="date"
                value={date.lastDate || ""}
                onChange={(e) =>
                  updateArrayField("importantDates", index, "lastDate", e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={() => removeRow("importantDates", index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addRow("importantDates")}
            className="add-button"
          >
            Add Important Date
          </button>

          {/* Fees */}
          <h2>Application Fee</h2>
          {jobDetails.fees.map((fee, index) => (
            <div key={index} className="form-row">
              <input
                name="category"
                type="text"
                placeholder="Category"
                value={fee.category || ""}
                onChange={(e) =>
                  updateArrayField("fees", index, "category", e.target.value)
                }
                required
              />
              <input
                name="amount"
                type="number"
                placeholder="Amount"
                value={fee.amount || ""}
                onChange={(e) =>
                  updateArrayField("fees", index, "amount", e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={() => removeRow("fees", index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addRow("fees")} className="add-button">
            Add Fee
          </button>

          {/* Age Limit */}
          <h2>Age Limit</h2>
          <label>Minimum Age</label>
          <input
            type="number"
            name="min"
            value={jobDetails.ageLimit.min}
            onChange={(e) =>
              setJobDetails((prev) => ({
                ...prev,
                ageLimit: { ...prev.ageLimit, min: e.target.value }
              }))
            }
            required
          />
          <label>Maximum Age</label>
          <input
            type="number"
            name="max"
            value={jobDetails.ageLimit.max}
            onChange={(e) =>
              setJobDetails((prev) => ({
                ...prev,
                ageLimit: { ...prev.ageLimit, max: e.target.value }
              }))
            }
            required
          />
          <label>Relaxation</label>
          <input
            type="text"
            name="relaxation"
            value={jobDetails.ageLimit.relaxation}
            onChange={(e) =>
              setJobDetails((prev) => ({
                ...prev,
                ageLimit: { ...prev.ageLimit, relaxation: e.target.value }
              }))
            }
          />

          {/* Selection Process */}
          <label>Selection Process</label>
          <input
            type="text"
            name="selectionProcess"
            value={jobDetails.selectionProcess}
            onChange={handleChange}
            required
          />

          {/* Qualification */}
          <h2>Qualification</h2>
          {jobDetails.Qualification.map((qual, index) => (
            <div key={index} className="input-row">
              <input
                type="text"
                placeholder="Enter Qualification"
                value={qual || ""}
                onChange={(e) =>
                  updateArrayField("Qualification", index, null, e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={() => removeRow("Qualification", index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addRow("Qualification")}
            className="add-button"
          >
            + Add Qualification
          </button>

          {/* Job Location */}
          <label>Job Location</label>
          <input
            type="text"
            name="jobLocation"
            value={jobDetails.jobLocation.location}
            onChange={(e) =>
              setJobDetails((prev) => ({
                ...prev,
                jobLocation: { location: e.target.value }
              }))
            }
            required
          />

          {/* Document Details */}
          <h2>Needed Documents</h2>
          {jobDetails.documentDetails.map((doc, index) => (
            <div key={index} className="document-row">
              <input
                type="text"
                placeholder="Enter document name"
                value={doc || ""}
                onChange={(e) =>
                  updateArrayField("documentDetails", index, null, e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={() => removeRow("documentDetails", index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addRow("documentDetails")}
            className="add-button"
          >
            Add Document
          </button>

          {/* Official Pdf Link */}
          <label>Official Pdf Link</label>
          <input
            type="text"
            name="officialPdfLink"
            value={jobDetails.officialPdfLink}
            onChange={handleChange}
            required
          />

          {/* Website Link */}
          <label>Website Link</label>
          <input
            type="text"
            name="websiteLink"
            value={jobDetails.websiteLink}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-button">
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;
