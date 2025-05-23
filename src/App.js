import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage';

import GovtJobs from './Pages/GovtJobs';
import PrivateJobs from './Pages/PrivateJobs.jsx';
import Register from './Components/Nav and footer/Register';
import Login from './Components/Nav and footer/Login';
import Dashboard from './Components/Admin pannel/Dashboard';
import Sidebar from './Components/Admin pannel/Sidebar';
import Revenue from './Components/Admin pannel/Revenue';
import GovtFormRequest from './Components/Admin pannel/GovtFormRequest.jsx';
import AboutUs from './Pages/AboutUs';
import GovtJobDetails from './Pages/GovtJobDetails';
import PrivateJobDetails from './Pages/PrivateJobDetails.jsx';
import AdmitCard from './Pages/AdmitCard';
import CreateJobPopup from './Components/Admin pannel/CreateJobPopup.jsx';
import CreateCard from './Components/Admin pannel/CreateCard';
import ProtectedRoute from './Components/ProtectedRoute';
import Analytics from './Components/Admin pannel/AnalyticsPage.jsx';
import EditJob from './Components/Admin pannel/EditJob.jsx';
import PrivacyPolicy from './Pages/Privacy_policy.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import Disclaimer from './Pages/Disclaimer.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import ResetPassword from './Components/Nav and footer/ResetPassword.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import JobDetailPage from './Components/Admin pannel/JobDetailPage.jsx';



function App() {
  return (
    <>
      <Router>

        <main className="main-content">
          <ScrollToTop />
          <Routes>

            <Route path="/" element={<Homepage />} />
            <Route path="/admit-card" element={<AdmitCard />} />

            <Route path="/govt-jobs" element={<GovtJobs />} />
            <Route path="/job-detail/:id" element={<GovtJobDetails />} />

            <Route path="/private-jobs" element={<PrivateJobs />} />
            <Route path="/pri-detail/:id" element={<PrivateJobDetails />} />

            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy_policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

            {/* ///////////////////////////////////////////////// */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/profile" element={<ProfilePage />} />


            {/* Protected Routes */}
            <Route
              path="/dashboard" element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job-detail-page" element={
                <ProtectedRoute isAdmin={true}>
                  <JobDetailPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile" element={
                <ProtectedRoute isAdmin={true}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sidebar" element={
                <ProtectedRoute isAdmin={true}>
                  <Sidebar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics" element={
                <ProtectedRoute isAdmin={true}>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-job/:id" element={
                <ProtectedRoute isAdmin={true}>
                  <EditJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/revenue" element={
                <ProtectedRoute isAdmin={true}>
                  <Revenue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/GovtFormRequest" element={
                <ProtectedRoute isAdmin={true}>
                  <GovtFormRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job-create" element={
                <ProtectedRoute isAdmin={true}>
                  <CreateJobPopup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/card-create" element={
                <ProtectedRoute isAdmin={true}>
                  <CreateCard />
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