import './Navbar.css';
import React from "react";
import { NavLink } from "react-router-dom";
import logoutIcon from '../Images/logout.png';

function Navbar({ user, handleLogout }) {
  return (
    <header className="header">
      <div className="title">
        <h2>WWW.SarkariGenius.com</h2>
      </div>
      <nav className="nav container">
  <div className="nav__menu">
    <ul className="nav__list">
      <li className="nav__item">
        <NavLink to="/" className="nav__link">Home</NavLink>
      </li>
      <li className="nav__item">
        <NavLink to="/govt-jobs" className="nav__link">GovtJobs</NavLink>
      </li>
      <li className="nav__item">
        <NavLink to="/private-jobs" className="nav__link">PrivateJob</NavLink>
      </li>
    </ul>

    <div className="nav__auth">
      {user ? (
        <>
          <span className="nav__username">Hi, {user.name}</span>
          <button className="nav__logout" onClick={handleLogout}>
            <img src={logoutIcon} alt="logoutIcon" className="logout-icon" />
          </button>
        </>
      ) : (
        <NavLink to="/login" className="nav__links nav__cta">Login</NavLink>
      )}
    </div>
  </div>
</nav>


    </header>
  );
}

export default Navbar;
