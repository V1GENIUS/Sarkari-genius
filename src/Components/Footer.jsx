import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <>
    
    <div className='footer'>
      <div className='quick_links'>
        <h2>Quick Links</h2>
        <ul className="footer__list">
           <li className="foot__item">
             <NavLink to="/" className="foot__link"  >
               Home
             </NavLink>
           </li>
           <li className="foot__item">
             <NavLink to="/it-jobs" className="foot__link"  >
               IT Jobs
             </NavLink>
           </li>
           <li className="foot__item">
             <NavLink
               to="/govt-jobs"
               className="foot__link"
               
             >
               GovtJobs
             </NavLink>
           </li>

         </ul>
      </div>
       <div className='overview'>
          <h2>Overview</h2>
          <ul className="overview__list">
          <li className="overview_item">
             <NavLink
               to="/about"
               className="over__link" >
               AboutUs
             </NavLink>
           </li>
           <li className="overview_item">
             <NavLink
               to="#ContactUs"
               className="over__link" >
               ContactUs
             </NavLink>
           </li>
          </ul>

       
      </div>
    </div>
    
    </>
  )
}

export default Footer