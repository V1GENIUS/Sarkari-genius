import { React, useEffect, useState, useNavigate,useParams } from '../import.js'
import { Navbar, Footer } from '../import.js'
import './Homepage.css'
import HomeImage from '../Components/Images/HomeImage.svg'
import APIGovtJobs from "../Components/Api/ApiGovtJobs.js"
import { Analytics } from "@vercel/analytics/react"
import APIPrivateJobs from '../Components/Api/ApiPrivateJobs.js'

function Homepage() {
  const [jobs, setJobs] = useState([])
  const [privateJobs, setPrivateJobs] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(APIGovtJobs.getAllJobs)
        const data = await response.json()
        setJobs(data.slice(0, 14))
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }
    fetchJobs()
  }, [id])

  useEffect(() => {
    const fetchPrivateJobs = async () => {
      try {
        const response = await fetch(APIPrivateJobs.getAllPrivateJobs)
        const data = await response.json()
        setPrivateJobs(data.slice(0, 14))
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }
    fetchPrivateJobs()
  }, [id])

  useEffect(() => {
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    const role = localStorage.getItem("role")

    if (token && name) {
      setUser({ name, role })
    } else {
      setUser(null)
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    navigate("/login")
  }

  const handleHeadClick = (job) => {
    navigate(`/job-detail/${job._id}`, { state: { job } })
  }

  return (
    <>
      <div>
        <Navbar user={user} handleLogout={handleLogout} />
        <Analytics />

        <div className='homeSection_1'>
          <div className='First_content'>
            <div>
              <h2>Welcome to No.1 Education portal Sarkari Genius</h2>
              <div className="head_btn">
                {jobs
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((job) => (
                    <button
                      key={job.id}
                      className="head_btn_1"
                      style={{ backgroundColor: getRandomColor() }}
                      onClick={() => handleHeadClick(job)}
                    >
                      <span><b>{job.postName}</b></span>
                    </button>
                  ))}
              </div>
            </div>

            <div className='HomeImage'>
              <img src={HomeImage} alt='homeImage' height={500} width={500} />
            </div>
          </div>
        </div>

        <div className='homeSection_3'>
          <div className='home_result'>
            <h3>Latest Govt Jobs</h3>
            <div className="latest_job">
              {jobs
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((job) => (
                  <li key={job._id} onClick={() => handleHeadClick(job)}>
                    {job.postName}
                  </li>
                ))}
            </div>
          </div>

          <div className='home_result'>
            <h3>Latest Private jobs</h3>
            <div className='result_link'>
              {privateJobs
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((job) => (
                  <li key={job._id} onClick={() => handleHeadClick(job)}>
                    {job.JobDegination} - <b style={{ color: 'red' }}>{job.organization}</b>
                  </li>
                ))}
            </div>
          </div>

          <div className='home_result'>
            <h3>Admit Card</h3>
            <div className='result_link'>
              {/* Placeholder for future content */}
            </div>
          </div>

          <div className='home_result'>
            <h3>Cards</h3>
            <div className='result_link'>
              {/* Placeholder for future content */}
            </div>
          </div>

          <div className='home_result'>
            <h3>Government Schemes</h3>
            <div className='result_link'>
              {/* Placeholder for future content */}
            </div>
          </div>

          <div className='home_result'>
            <h3>All Ekyc's</h3>
            <div className='result_link'>
              {/* Placeholder for future content */}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

function getRandomColor() {
  const colors = [
    'rgb(123, 255, 0)',
    'rgb(153, 110, 246)',
    'rgb(249, 92, 111)',
    'rgb(227, 90, 255)',
    'rgb(0, 255, 119)',
    'rgb(255, 183, 0)',
    'rgba(253, 26, 26, 0.89)',
    'rgb(255, 8, 206)',
    'rgb(38, 147, 225)',
    'rgb(229, 255, 0)',
    'rgba(255, 217, 0, 0.67)',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export default Homepage
