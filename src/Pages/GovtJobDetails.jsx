import React from 'react'
import './GovtJobDetails.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function GovtJobDetails() {
  return (
    <>
    <div>
        <Navbar/>
        <div className='job_details'>
          <div className='job_page'>
          <h1>mp police commision recuirment 2024</h1>
          <h3>POST NAME : police constable</h3>
          <h3>uttrakhand cordinationt service Selection commission (sssc)</h3>


          <div>
            <div className='imp_date'>
            <h1>Important dates</h1>
            </div>
            
            <div>
              <table className='date_table'>

                <tr>
                  <td><b>Notification Release Date</b></td>
                  <td><b>30 October</b></td>
                  
                </tr>
                <tr>
                  <td><b>Application Start Date</b></td>
                  <td><b>8 November 2024</b></td>
                  
                </tr>
                <tr>
                  <td><b style={{color:'red'}}>Application Last Date</b></td>
                  <td><b>29 November 2024</b></td>
                  
                </tr>
                <tr>
                  <td ><b style={{color:'red'}}>Last Date for Fee Payment</b></td>
                  <td ><b style={{color:'red'}}>29 November</b></td>
                  
                </tr>
                <tr>
                  <td><b>Admit Card Release Date</b></td>
                  <td><b>Notify Soon</b></td>
                  
                </tr>
                <tr>
                  <td><b>Uk Police Constable Exam Date</b></td>
                  <td><b>15 june 2025</b></td>
                  
                </tr>

              </table>

            </div>
          </div>
          <div>
            <div className='imp_date'>
            <h1>Application Fee</h1>
            </div>
            
            <div>
              <table className='date_table'>

                <tr>
                  <td><b>General / Unreserved</b></td>
                  <td><b>Rs. 300/-</b></td>
                  
                </tr>
                <tr>
                  <td><b>SC / ST / EWS</b></td>
                  <td><b>Rs. 150/-</b></td>
                  
                </tr>
                <tr>
                  <td><b >Orphan</b></td>
                  <td><b>Rs. 0/-</b></td>
                  
                </tr>
                <tr>
                  <td ><b >Payment Mode</b></td>
                  <td ><b >Online</b></td>
                </tr>

              </table>

            </div>
          </div>
          <div>
            <div className='imp_date'>
            <h1>Age Limit (01 July 2024 )</h1>
            </div>
            
            <div>
              <table className='date_table'>

                <tr>
                  <td><b>Minimum Age</b></td>
                  <td><b>18 years</b></td>
                  
                </tr>
                <tr>
                  <td><b>Maximum Age</b></td>
                  <td><b>22 years</b></td>
                  
                </tr>
                <tr>
                  <td><b >Age Relaxation</b></td>
                  <td><b>As per Schedule</b></td>
                  
                </tr>

              </table>

            </div>
          </div>
          <div>
            <div className='imp_date'>
            <h1>RRB NTPC 10+2 Vacancy 2024 : Eligibility Criteria</h1>
            </div>
            
            <div>
              <table className='eligibility'>

                <thead>
                  <th>
                    <b>Post Name</b>
                  </th>
                  <th>
                    <b>No. of Post</b>
                  </th>
                  <th className='eligible'>
                    <b>Education Qualification</b>
                  </th>
                </thead>

                <tr>
                  <td><b>Acoutant clerk typist</b></td>
                  <td ><b>361</b></td>
                  <td><b >
                    <li style={{padding:'10px'}}>this is for 10th and 12th class students opportutnity  also 
                    </li>
                    <li>this is for 10th and 12th class students opportutnity  also 
                    </li></b></td>

                </tr>
                <tr>
                  <td><b>Junior Typist</b></td>
                  <td><b>990</b></td>
                </tr>
                <tr>
                  <td><b >Senior clerk typist</b></td>
                  <td><b>9987</b></td>
                </tr>

                <thead>
                  <th>
                    <b>Total</b>
                  </th>
                  <th>
                    <b>22321 posts</b>
                  </th>
                  <th>
                    <b >Note :<ul style={{color:'red' , fontSize:'20px'}}>Read official Notification Before Applying</ul></b>
                    
                  </th>
                  
                 
                </thead>

              </table>
          

            </div>
          </div>

          </div>
        </div>
        <Footer/>
        
    </div>
    </>
  )
}

export default GovtJobDetails