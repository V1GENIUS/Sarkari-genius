import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterLogin.css";

function Login() {
  const [formData, setFormData] = useState({
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

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.user.role); // Store the role (admin or user)

        // Redirect based on user role
        if (result.user.role === "admin") {
          navigate("/dashboard"); // Admin Dashboard
        } else {
          navigate("/"); // Home Page for regular users
        }
      } else {
        setError(result.message || "Login failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
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
            <button onClick={() => navigate("/register")} className="registers_btn">
              Register
            </button>
          </h5>
          <button className="login_google">Login With Google</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
