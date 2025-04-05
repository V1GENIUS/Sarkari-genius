import React from 'react'
import Footer from '../Components/Nav and footer/Footer'
import Navbar from '../Components/Nav and footer/Navbar'
import {useNavigate ,useState} from '../Utils/import'
import './AboutUs.css'

function AboutUs() {
   const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const handleLogout = () => {
      localStorage.clear();
      setUser(null);
      navigate("/login");
    };
    
  
  return (
    <>
    <div>
    <Navbar  user={user} handleLogout={handleLogout} />
      <div className='about-page'>
        <h1>Sarkari genius </h1>

      </div>
      <div >
        <Footer/>
      </div>
    </div>
    </>
  )
}

export default AboutUs