import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./RegisterLogin.css";
import All_api from "../Api/All_api";
import { GoogleLogin } from "@react-oauth/google";
function Register() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(All_api.APILoginRegister.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(All_api.APILoginRegister.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        const { token, user } = result;
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("name", user.name);
        navigate(user.role === "admin" ? "/dashboard" : "/");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(All_api.APILoginRegister.GoogleLogin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId: credentialResponse.credential }),
      });

      const result = await response.json();
      if (response.ok) {
        const { token, user } = result;
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("name", user.name);
        navigate(user.role === "admin" ? "/dashboard" : "/");
      } else {
        setError(result.message || "Google login failed.");
      }
    } catch (err) {
      setError("Something went wrong with Google login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google Login Failed. Please try again.");
  };


  return (
    <div className="register">
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Register Page</h1>
      </div>
      <div className="register_page">
        <div className="register_input">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="registers_btn" onClick={handleRegister}>
            Register
          </button>
          {error && <p className="error-message">{error}</p>}
          <h5 style={{ marginTop: "10px" }}>
            Already registered?{" "}
            <button onClick={() => navigate("/login")} className="logins_btn">
              Login
            </button>
          </h5>

          <GoogleLogin className="login_google"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
          {/* <button className="login_google">Register With Google</button> */}
        </div>
      </div>
    </div>
  );
}

export default Register;
