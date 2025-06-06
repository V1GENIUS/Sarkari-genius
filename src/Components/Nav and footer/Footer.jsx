import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import whatsapp from '../Images/whatsapp.png';
import facebook from '../Images/facebook.png';
import telegram from '../Images/telegram.png';
import linkedin from '../Images/whatsapp.png';

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul className="footer__list">
            <li className="foot__item">
              <NavLink to="/" className="foot__link">
                Home
              </NavLink>
            </li>
            <li className="foot__item">
              <NavLink to="/govt-jobs" className="foot__link">
                Govt Jobs
              </NavLink>
            </li>
            <li className="foot__item">
              <NavLink to="/private-jobs" className="foot__link">
                Private Jobs
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Overview</h2>
          <ul className="overview__list">
            <li className="overview_item">
              <NavLink to="/about" className="over__link">
                About Us
              </NavLink>
            </li>
            <li className="overview_item">
              <NavLink to="/privacy_policy" className="over__link">
                Privacy Policy
              </NavLink>
            </li>
            <li className="overview_item">
              <NavLink to="/contact-us" className="over__link">
                Contact Us
              </NavLink>
            </li>
            <li className="overview_item">
              <NavLink to="/disclaimer" className="over__link">
              Disclaimer
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer">
              <img src={whatsapp} alt="WhatsApp" className="social-icon" />
            </a>
            <a href="https://www.facebook.com/share/12FJ6yEsHtN/" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://t.me/sarkarigeniusfresher" target="_blank" rel="noopener noreferrer">
              <img src={telegram} alt="Twitter" className="social-icon" />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="LinkedIn" className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h2>Subscribe</h2>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Sarkari Genius. All Rights Reserved.</p>
      </div>
    </>
  );
}

export default Footer;
