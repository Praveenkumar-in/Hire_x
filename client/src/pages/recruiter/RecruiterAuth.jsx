
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  recruiterLogin,
  recruiterRegister,
} from "../../services/recruiterAuth";
import { Link } from "react-router-dom";

const RecruiterAuth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ================= AUTO REDIRECT IF LOGGED IN =================
  useEffect(() => {
    const token = localStorage.getItem("recruiterToken");
    if (token) {
      navigate("/recruiter/dashboard");
    }
  }, [navigate]);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }

    if (!isLogin && !formData.name.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      if (isLogin) {
        await recruiterLogin(formData);
        toast.success("Login successful 🚀");
      } else {
        await recruiterRegister(formData);
        toast.success("Account created successfully 🎉");
      }

      navigate("/recruiter/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Authentication failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recruiter-login-wrapper">
        <button className="back-btn" onClick={() => navigate("/", { replace: true })}>
  ← Back to Home
</button>
      {/* LEFT SIDE */}
      <div className="login-left">
        <h1>HireX</h1>
        <p>
          Hire smarter. Find top talent faster with AI-powered recruitment.
        </p>
        <div className="floating-shapes"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">

        <form className="login-card" onSubmit={handleSubmit}>

          <h2>
            {isLogin ? "Recruiter Login" : "Create Recruiter Account"}
          </h2>

          <p className="subtitle">
            {isLogin
              ? "Access your hiring dashboard"
              : "Start hiring with HireX"}
          </p>

          {/* NAME (REGISTER ONLY) */}
          {!isLogin && (
            <div className="input-group">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label>Full Name</label>
            </div>
          )}

          {/* EMAIL */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label>Email Address</label>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isLogin
                ? "Login"
                : "Create Account"}
          </button>

          {/* SWITCH MODE */}
          <p className="bottom-text">
            {isLogin ? "New recruiter?" : "Already have account?"}
            <span
              style={{ cursor: "pointer", marginLeft: "6px" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create Account" : "Login"}
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default RecruiterAuth;