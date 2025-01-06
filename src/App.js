import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage';
import ITJobs from './Pages/ITJobs';
import GovtJobs from './Pages/GovtJobs';
import Register from './Components/Nav and footer/Register';
import Login from './Components/Nav and footer/Login';
import Dashboard from './Components/Admin pannel/Dashboard';
import Sidebar from './Components/Admin pannel/Sidebar';
import Revenue from './Components/Admin pannel/Revenue';
import Orders from './Components/Admin pannel/Orders';
import AboutUs from './Pages/AboutUs';
import GovtJobDetails from './Pages/GovtJobDetails';
import AdmitCard from './Pages/AdmitCard';
import ViewJobs from './Components/Admin pannel/JobLinks/ViewJobs.jsx';
import CreateJob from './Components/Admin pannel/CreateJobPopup';
import CreateJobLink from './Components/Admin pannel/JobLinks/CreateJobLink.jsx';
import CreateJobPopup from './Components/Admin pannel/CreateJobPopup.jsx';


function App() {
  return (
    <>
   <Router>
     
     <main className="main-content">

       <Routes>
         <Route path="/" element={<Homepage />} />
         <Route path="/it-jobs" element={<ITJobs />} />
         <Route path="/admit-card" element={<AdmitCard />} />
         
         <Route path="/govt-jobs" element={<GovtJobs />} />
         <Route path="/job-detail/:id" element={<GovtJobDetails />} />
         <Route path="/about" element={<AboutUs />} />
         <Route path="/view-job-link" element={<ViewJobs />} />

{/* ///////////////////////////////////////////////// */}
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />

         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/Sidebar" element={<Sidebar />} />
         <Route path="/revenue" element={<Revenue />} />
         <Route path="/orders" element={<Orders />} />
         <Route path="/job-create" element={<CreateJobPopup />} />
         <Route path="/create-job-link" element={<CreateJobLink />} />

        
       </Routes>
     </main>
   </Router>
    </>
  );
}

export default App;
