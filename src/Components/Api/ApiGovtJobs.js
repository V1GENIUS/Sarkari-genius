import { BASE_URL } from "./ApiURL";


const APIGovtJobs = {
  getJobDetails: (id) => `${BASE_URL}/api/jobs/${id}`,
  createJob: `${BASE_URL}/api/jobs/create`,
  updateJob: (id) => `${BASE_URL}/api/jobs/jobs/${id}`,
  deleteJob: (id) => `${BASE_URL}/api/jobs/${id}`,
  getAllJobs: `${BASE_URL}/api/jobs` ,
 
};

export default APIGovtJobs;
