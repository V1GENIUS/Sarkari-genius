import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterLogin.css";

import { GoogleLogin } from "@react-oauth/google";
import All_api from "../Api/All_api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [message, setMessage] = useState("");
  const[showPasswordicon,setShowPasswordicon]=useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      navigate(role === "admin" ? "/dashboard" : "/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    setError("");
    setMessage("");
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

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");
    if (!forgotEmail) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(All_api.APILoginRegister.forgotPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Reset link sent to your email.");
      } else {
        setError(result.message || "Failed to send reset link.");
      }
    } catch (err) {
      setError("Error sending reset link.");
    }
  };

  return (
    <div className="login">
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Login Page</h1>
      </div>

      <div className="login_page">
        <div className="login_input">
          {!forgotMode ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <div className="password-sh">              
               <input
               type={showPasswordicon ?"text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required />
                
                {/* ICON ADD */}

               <span className="password-icon" onClick={()=>{setShowPasswordicon(!showPasswordicon)
                   console.log("Show Password:", !showPasswordicon)
               }}>
                   
                  {showPasswordicon ?<FaEyeSlash /> : <FaEye />
                  }

                </span>
                </div>
              <button
                className="login_btn"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <button
                type="button"
                className="forgot_btn"
                onClick={() => {
                  setForgotMode(true);
                  setMessage("");
                  setError("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  marginTop: "8px",
                  textDecoration: "underline"
                }}
              >
                Forgot Password?
              </button>

              <h5 style={{ marginTop: "10px" }}>
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="register_btn"
                >
                  Register
                </button>
              </h5>

              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <button
                className="logins_btn"
                onClick={handleForgotPassword}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <button
                className="registers_btn"
                onClick={() => {
                  setForgotMode(false);
                  setForgotEmail("");
                  setError("");
                  setMessage("");
                }}
              >
                Back to Login
              </button>
            </>
          )}

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;

