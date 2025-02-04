import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterLogin.css";
import APILoginRegister from "../Api/ApiLoginRegister";
import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "admin") {
        navigate("/dashboard"); // Redirect to admin dashboard
      } else {
        navigate("/"); // Redirect to home page for normal users
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(APILoginRegister.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.user.role);

        if (result.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(result.message || "Login failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // const decoded = jwtDecode(credentialResponse.credential);
      // const googleUserData = {
      //   email: decoded.email,
      //   name: decoded.name,
      //   googleId: decoded.sub,
      // };

      const response = await fetch(APILoginRegister.googleLogin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.user.role);

        if (result.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(result.message || "Google login failed.");
      }
    } catch (err) {
      setError("Something went wrong with Google login. Please try again.");
    }
  };

  const handleGoogleError = () => {
    setError("Google Login Failed. Please try again.");
  };

  return (
    <div className="login">
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Login Page</h1>
      </div>
      <div className="login_page">
        <div className="login_input">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="logins_btn" onClick={handleLogin}>
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
          <h5 style={{ marginTop: "10px" }}>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="registers_btn"
            >
              Register
            </button>
          </h5>
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        </div>
      </div>
    </div>
  );
}

export default Login;
