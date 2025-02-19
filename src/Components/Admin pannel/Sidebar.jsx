import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Menu icon

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect screen size to determine if it's mobile
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isSmallScreen);
      setIsOpen(!isSmallScreen); 
    };

    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
            {/* <img src={Profile} alt="Profile" /> */}
            <h3>Vivek Rathore</h3>
          </div>
        </div>

        <nav className="nav_items">
          <NavLink to="/dashboard" className="nav_text">Dashboard</NavLink>
          <NavLink to="/orders" className="nav_text">Total Order</NavLink>
          <NavLink to="/revenue" className="nav_text">Revenue</NavLink>
          <NavLink to="/analytics" className="nav_text">Analytics</NavLink>
          <button className="nav_text logout_button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
