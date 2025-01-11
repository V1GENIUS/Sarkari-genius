import './Navbar.css';
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="header">
      <div className="title">
        <h2>WWW.SarkariGenius.com</h2>
      </div>
      <nav className="nav container">
        {/* Menu List */}
        <div className="nav__menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link">
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/govt-jobs" className="nav__link">
                Jobs
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/govt-jobs" className="nav__link">
                AnswerKey
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
