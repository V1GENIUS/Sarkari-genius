import './Navbar.css';
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 768) {
      setShowMenu(false);
    }
  };

  return (
    <header className="header">
      <div className="title">
        <h2>WWW.SarkariGenius.com</h2>
      </div>
      <nav className="nav container">
        {/* Hamburger Toggle Button */}
        <div className="nav__toggle" onClick={toggleMenu}>
          <span className={`hamburger ${showMenu ? "active" : ""}`}></span>
        </div>

        {/* Menu List */}
        <div className={`nav__menu ${showMenu ? "show-menu" : ""}`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/govt-jobs"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                Jobs
              </NavLink>
            </li>
            {/* <li className="nav__item">
              <NavLink
                to="/view-job-link"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                View Job Link
              </NavLink>
            </li> */}
            <li className="nav__item">
              <NavLink
                to="/about"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                Answer Key
              </NavLink>
            </li>
            {/* <li className="nav__item">
              <NavLink
                to="/about"
                className="form_fill"
                onClick={closeMenuOnMobile}
              >
                Form Filling Service
              </NavLink>
            </li> */}
            <li className="nav__item">
              <NavLink
                to="/dashboard"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/login" className="nav__links nav__cta">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
