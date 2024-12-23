import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import Profile from './adminProfile.jpg';
import { FaBars } from 'react-icons/fa'; // Menu icon

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // Sidebar always open on large screens
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size to determine if it's mobile
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isSmallScreen);
      setIsOpen(!isSmallScreen); // Sidebar is open by default on larger screens
    };

    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize); // Update on resize

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMobile && (
        <div className="menu-icon" onClick={toggleSidebar}>
          <FaBars />
        </div>
      )}

      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="admin_profile">
          <h1 className="side_head">Genius</h1>
          <div className="profile_image">
            <img src={Profile} alt="Profile" />
            <h3>Vivek Rathore</h3>
          </div>
        </div>

        <div className="nav_items">
          <NavLink to="/dashboard" className="nav_text">Dashboard</NavLink>
          <NavLink to="/orders" className="nav_text">Total Order</NavLink>
          <NavLink to="/revenue" className="nav_text">Revenue</NavLink>
          <NavLink to="#Analytics" className="nav_text">Analytics</NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
