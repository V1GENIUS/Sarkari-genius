import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterLogin.css";

function Register() {
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
      const response = await fetch("https://sarkari-genius.vercel.app/api/user/register", {
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
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
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
          <button className="login_google">Register With Google</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
