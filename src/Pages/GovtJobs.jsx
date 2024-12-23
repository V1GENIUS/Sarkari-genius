import React from 'react'
import './GovtJobs.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import GovtJobCard from '../Components/GovtJobCard'

function GovtJobs() {
  return (
    <>
    <div>
    <Navbar />
    

      <div className='govtSection_1'>
      <h1 >
        Sarkari Job Vacancy
      </h1>
      <h3>
      We provide MPSC | SSC | Railway| Govt schemes Job Vacancy News <br/> <br/> With <b>Form Filling Home Services</b>.
      </h3>

      </div>


      <div className='govt_cards'>
        <GovtJobCard/>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default GovtJobs