import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <>
      <div className='footer'>
        <div className='footer-section'>
          <h2>Quick Links</h2>
          <ul className="footer__list">
            <li className="foot__item">
              <NavLink to="/" className="foot__link">
                Home
              </NavLink>
            </li>
            {/* <li className="foot__item">
              <NavLink to="/it-jobs" className="foot__link">
                IT Jobs
              </NavLink>
            </li> */}
            <li className="foot__item">
              <NavLink to="/govt-jobs" className="foot__link">
                Govt Jobs
              </NavLink>
            </li>
          </ul>
        </div>

        <div className='footer-section'>
          <h2>Overview</h2>
          <ul className="overview__list">
            <li className="overview_item">
              <NavLink to="/about" className="over__link">
                About Us
              </NavLink>
            </li>
            <li className="overview_item">
              <NavLink to="#ContactUs" className="over__link">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        

        <div className='footer'>
        <div className='footer-section'>
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className='footer-section'>
          <h2>Subscribe</h2>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>

        </div>

       
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2025 Sarkari Genius. All Rights Reserved.</p>
      </div>
    </>
  );
}

export default Footer;
