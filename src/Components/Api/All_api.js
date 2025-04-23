// import { BASE_URL } from "./ApiURL";
// const BASE_URL = "http://localhost:7000";
const BASE_URL = "https://sarkari-genius.onrender.com";
//  const BASE_URL = "http://127.0.0.1:7000"



 const APIGovtJobs = {
    getJobDetails: (id) => `${BASE_URL}/api/jobs/${id}`,
    createJob: `${BASE_URL}/api/jobs/create`,
    updateJob: (id) => `${BASE_URL}/api/jobs/jobs/${id}`,
    deleteJob: (id) => `${BASE_URL}/api/jobs/${id}`,
    getAllJobs: `${BASE_URL}/api/jobs` ,
    submitGovtRequestForm : `${BASE_URL}/api/jobs/govt-request`,
    getAllGovtRequest :`${BASE_URL}/api/jobs/request` ,
   
  };


const APIGovtCards = {
  getCardDetails: (id) => `${BASE_URL}/api/cards/${id}`,
  createCard: `${BASE_URL}/api/cards/create`,
  updateCard: (id) => `${BASE_URL}/api/cards/${id}`,
  deleteCard: (id) => `${BASE_URL}/api/cards/${id}`,
  getAllCards: `${BASE_URL}/api/cards`  ,
};



const APILoginRegister = {
    login: `${BASE_URL}/api/user/login`,
    register: `${BASE_URL}/api/user/register`,
    GoogleLogin: `${BASE_URL}/api/user/google-login`,
    forgotPassword: `${BASE_URL}/api/user/forgot-password`,
    ResetPassword:  `${BASE_URL}/api/user/reset-password`
  };


const APIPrivateJobs = {
  getPrivateJobDetails: (id) => `${BASE_URL}/api/jobs/pri/${id}`,
  createPrivateJob: `${BASE_URL}/api/jobs/pri/create`,
  updatePrivateJob: (id) => `${BASE_URL}/api/jobs/pri/${id}`,
  deletePrivateJob: (id) => `${BASE_URL}/api/jobs/pri/${id}`,
  getAllPrivateJobs: `${BASE_URL}/api/jobs/pri` ,
 
};

export default {APIPrivateJobs,APILoginRegister,APIGovtCards,APIGovtJobs};


