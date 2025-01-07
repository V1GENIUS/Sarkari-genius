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

import CreateJobPopup from './Components/Admin pannel/CreateJobPopup.jsx';
import ProtectedRoute from './Components/ProtectedRoute';



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
        
{/* ///////////////////////////////////////////////// */}
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />

        
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sidebar" 
            element={
              <ProtectedRoute isAdmin={true}>
                <Sidebar />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/revenue" 
            element={
              <ProtectedRoute isAdmin={true}>
                <Revenue />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute isAdmin={true}>
                <Orders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/job-create" 
            element={
              <ProtectedRoute isAdmin={true}>
                <CreateJobPopup />
              </ProtectedRoute>
            } 
          />
       </Routes>
     </main>
   </Router>
    </>
  );
}

export default App;
