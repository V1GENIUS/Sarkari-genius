
// const BASE_URL = "https://sarkari-genius.onrender.com";
const BASE_URL = "http://localhost:7000";


const APIGovtJobs = {
  getJobDetails: (id) => `${BASE_URL}/api/jobs/${id}`,
  createJob: `${BASE_URL}/api/jobs/create`,
  updateJob: (id) => `${BASE_URL}/api/jobs/${id}`,
  deleteJob: (id) => `${BASE_URL}/api/jobs/${id}`,
  getAllJobs: `${BASE_URL}/api/jobs` ,
};

export default APIGovtJobs;
