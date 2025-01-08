import React,{ useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Nav and footer/Navbar'
import Footer from '../Components/Nav and footer/Footer'
import './Homepage.css'
import HomeImage from '../Images/HomeImage.svg'


function Homepage() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://sarkari-genius.vercel.app/api/jobs');
        const data = await response.json();
        setJobs(data.slice(0, 14));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  
 

  const handleHeadClick = (job) => {
    navigate(`/job-detail/${job._id}`, { state: { job } });
  };
  return (
  <>
  <div>
    <Navbar/>
    <div className='homeSection_1'>
      <div className='First_content'>
        <div>
        <h2>Welcome to No.1 Education portal Sarkari Genius</h2>
    

        <div className="head_btn">
  {jobs.map((job) => (
    <button
      key={job.id} job={job}
      className="head_btn_1"
      style={{ backgroundColor: getRandomColor() }}
      onClick={() => handleHeadClick(job)}
    >
      <span><b>{job.postName}</b></span>
    </button>
  ))}
</div>



        </div>

        <div  className='HomeImage'>
          <img src={HomeImage} alt='homeImage' height={500} width={500} ></img>
        </div>
      
      </div>

      
    </div>


{/* ////////////////////////////////////////////////////////// */}

    <div className='homeSection_2'>
      <div style={{display:'flex'}}>
         <div className='find_job'>
      <h1>Find Govt Job Easily </h1>
      <div><li>Genius Job is your Source for Government Job listing across central and state departments.  
      </li>
      <li>out platforms keeps you updates with latest opening,</li>
      <li>so you can find the right role quickly and easily
      </li></div>
      


         </div>

        
         <div className='quick_search'>
      <h1>Quick & simple Search</h1>
      <div>
      <li>Easily browse. filter. and apply for jobs in just few clicks.</li>
      <li>Our user friendly features</li>
      <li>One click application, real time job searching and smooth</li>

      </div>
    
      </div> 
      </div>
      <div className='form_filling'>
      <h1>Form filling Assistance</h1>
     

      <div>
<li>Need help with application ? </li>
      <li>Our work from home Assistance Service providersexpert Guidance for form filling</li>
      <li>Understanding eligibility, and meeting deadlines  All from  comfort at your home</li>
      </div>
     
         </div>
      </div>


      {/* ////////////////////////////////////////////////////////////// */}

      <div className='homeSection_3'>
      <div className='home_result'>
          <h3>Latest Jobs</h3>
          <div className="latest_job">
        
          {jobs.map((job) => (
            <li key={job._id} onClick={() => handleHeadClick(job)}>{job.postName}
            </li>
          ))}
        
      </div>

        </div>
        <div className='home_result'>
          <h3>Result</h3>
          <div className='result_link'>
          {jobs.map((job) => (
            <li key={job._id} onClick={() => handleHeadClick(job)}>{job.postName}
            </li>
          ))}
          </div>

        </div>
        <div className='home_result'>
          <h3>Admit Card</h3>
          <div className='result_link'>
          {jobs.map((job) => (
            <li key={job._id} onClick={() => handleHeadClick(job)}>{job.postName}
            </li>
          ))}
          </div>

        </div>
       

      </div>



      {/*     //////////////////////////////////////////////////////////////////// */}


  <Footer/>
  </div>
  </>
  )
}


// Utility function to generate random colors
function getRandomColor() {
  const colors = [
    'rgb(123, 255, 0)',
    'rgb(153, 110, 246)',
    'rgb(249, 92, 111)',
    'rgb(227, 90, 255)',
    'rgb(0, 255, 119)',
    'rgb(255, 183, 0)',
    'rgb(255, 45, 97)',
    'rgb(255, 8, 206)',
    'rgb(38, 147, 225)',
    'rgb(229, 255, 0)',
    'rgb(135, 115, 0)',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}


export default Homepage