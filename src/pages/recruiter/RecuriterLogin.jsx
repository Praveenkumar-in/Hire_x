
import React, { useState } from "react";
import { Link } from "react-router-dom";

const RecruiterLogin = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recruiter Login:", formData);
  };

  return (
    <div className="recruiter-login-wrapper">

      {/* Left Side Branding */}
      <div className="login-left">
        <h1>HireX</h1>
        <p>
          Hire smarter. Find top talent faster with AI-powered recruitment.
        </p>

        <div className="floating-shapes"></div>
      </div>

      {/* Login Card */}
      <div className="login-right">
        <form className="login-card" onSubmit={handleSubmit}>

          <h2>Recruiter Login</h2>
          <p className="subtitle">Access your hiring dashboard</p>

          <div className="input-group">
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
            <label>Password</label>
          </div>
         <Link to ="/recruiter/dashboard">
          <button className="login-btn">Login</button>
          </Link>
          <p className="bottom-text">
            New recruiter? <span>Create Account</span>
          </p>

        </form>
      </div>

    </div>
  );
};

export default RecruiterLogin;
