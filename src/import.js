import { useNavigate ,useParams ,useLocation } from 'react-router-dom';
import React,{ useEffect, useState }  from 'react'

import axios from 'axios'


import Navbar from "./Components/Nav and footer/Navbar.jsx";
import Footer from "./Components/Nav and footer/Footer.jsx";
import LoadingSpinner from "./Components/LoadingSpinner.jsx";

export {useNavigate ,React ,useEffect, useState ,useParams, useLocation,  
    axios,
    Navbar, Footer ,LoadingSpinner
};