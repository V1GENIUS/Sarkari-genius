import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate();
  const [visitorCount, setVisitorCount] = useState(0);
  const [error, setError] = useState(null);

  
  useEffect(() => {
   
    axios.post('http://localhost:7000/api/visitor')
      .then(response => {
      
        setVisitorCount(response.data.count);
        console.log(response.data.message); 
      })
      .catch(err => {
     
        setError('Error updating visitor count');
        console.error(err);
      });
  }, []);
const CreateJobLink =()=>{
  navigate('/job-create');
};

  
  return (
    <>
      <div className='dashboard'>
      <Sidebar/>
      <div >
       
        <div className='dashboard_head'>
            <h1>Dashboard</h1>
        </div>

        <div style={{display:'flex'}}>
        <div >
          <button className='job-create' onClick={CreateJobLink}><b>+ Create Job</b></button>
        </div>
        <div >
          <button className='job-create' onClick={CreateJobLink} >Create Job Link</button>
        </div>
        
        </div>
       
        <div className='orderBox' >
            <div className='box'>
                 <h4>visitor Count</h4>
            <h4>{visitorCount}</h4>
            </div>

            <div className='box'>

            <h4>Active Jobs</h4>
            <h4>23</h4>
            </div>

            <div className='box'>
                <h4>Total order</h4>
                <h4>3</h4>
            </div>

            <div className='box'>
                <h4>Pending order</h4>
                <h4>5</h4>
            </div>

            <div className='box'>
                <h4>Complete order</h4>
                <h4>3</h4>
            </div>

        </div>
     </div>

      </div>
    </>
  )
}

export default Dashboard