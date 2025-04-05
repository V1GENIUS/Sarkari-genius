import { BASE_URL } from "./ApiURL";


const APIPrivateJobs = {
  getPrivateJobDetails: (id) => `${BASE_URL}/api/jobs/pri/${id}`,
  createPrivateJob: `${BASE_URL}/api/jobs/pri/create`,
  updatePrivateJob: (id) => `${BASE_URL}/api/jobs/pri/${id}`,
  deletePrivateJob: (id) => `${BASE_URL}/api/jobs/pri/${id}`,
  getAllPrivateJobs: `${BASE_URL}/api/jobs/pri` ,
 
};

export default APIPrivateJobs;


