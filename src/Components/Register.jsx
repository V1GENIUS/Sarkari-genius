import React from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate();

  const handleClickLogin=()=>{
    navigate('/login');
  }
  return (
    <>
     <div className='register' >
     <div style={{textAlign:'center', marginTop:'100px'}}><h1>Register Page</h1></div>
    <div className='register_page'>

        <div className='register_input'>
        <input  type='name' placeholder='Name' ></input>
        <input  type='username' placeholder='Username' ></input>
        <input  type='email' placeholder='Email' ></input>
           
            <input type="password" placeholder='Password'></input>
            <button  className='registers_btn'>Register</button>
            <h5 style={{marginTop:'10px'}}>if you already Registered then click ! <button onClick={handleClickLogin} className='logins_btn'>Login</button></h5>
            <button  className='login_google'> Register With Google</button>
           
        </div>

    </div>
    </div>
    </>
  )
}

export default Register