import React from 'react'
import './RegisterLogin.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();

  const handleClickRegister=()=>{
    navigate('/register');
  }
  
  return (
    < >
    <div className='login' >
     <div style={{textAlign:'center', marginTop:'100px'}}><h1>Login page</h1></div>
    <div className='login_page'>

        <div className='login_input'>
            <input  type='email' placeholder='Email' ></input>
            <input type="password" placeholder='Password'></input>
            <button  className='login_btn'>Login</button>
            <h5 style={{marginTop:'10px'}}>if you are not Register then click ! <button  className='register_btn' onClick={handleClickRegister}>Register</button></h5>
            <button  className='login_google'>Login With Google</button>
           
        </div>

    </div>
    </div>
    </>
  )
}

export default Login