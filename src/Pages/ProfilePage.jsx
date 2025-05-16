import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ProfilePage.css';  // Import the CSS file for styling
import logoutIcon from "../Components/Images/logout.png";
import All_api from "../Components/Api/All_api"; // Assuming you have an image for logout



function ProfilePage({ handleLogout }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user profile once the component mounts
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return navigate("/login");
        }

        const response = await axios.get(All_api.APILoginRegister.profile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data.user); // Set the user data from the response
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/login"); // Redirect to login if there is an error
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogoutClick = () => {
    // Call handleLogout function passed as a prop
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <div className="profile-page">
      {userData ? (
        <div className="profile-info">
          <h2>Profile Information</h2>
          <div className="profile-details">
            <p><strong>Name:</strong> <span>{userData.name}</span></p>
            <p><strong>Username:</strong> <span>{userData.username}</span></p>
            <p><strong>Email:</strong> <span>{userData.email}</span></p>
            <p><strong>Role:</strong> <span>{userData.role}</span></p>
          </div>
          <button className="logout-button" onClick={handleLogoutClick}>
            <img src={logoutIcon} alt="Logout" className="logout-icon" />
            Logout
          </button>
        </div>
      ) : (
        <div className="loading-text">Loading...</div>
      )}

    </div>
  );
}

export default ProfilePage;
