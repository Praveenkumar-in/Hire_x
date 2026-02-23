import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//import "./AdminLogin.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(`${API_URL}/admin/login`, formData);

      localStorage.setItem("adminToken", res.data.token);

      toast.success("Admin Login Successful 🚀");

      navigate("/admin/dashboard");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Invalid admin credentials"
      );

    }

    setLoading(false);
  };

  return (
    <div className="admin-login-wrapper">

      {/* Floating background shapes */}
      <div className="admin-bg">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <form className="admin-login-card" onSubmit={handleSubmit}>

        <h2>HireX Admin</h2>

        <p className="admin-subtitle">
          Secure access to admin dashboard
        </p>

        <div className="admin-input-group">

          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
          />

          <label>Email Address</label>

        </div>

        <div className="admin-input-group">

          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
          />

          <label>Password</label>

        </div>

        <button
          type="submit"
          className="admin-login-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Admin Login"}
        </button>

      </form>

    </div>
  );
};

export default AdminLogin;