import React from "react";
import { Link } from "react-router-dom";

const RecruiterDashboard = () => {

  const jobs = [
    { title: "Frontend Developer", applicants: 45, status: "Active" },
    { title: "UI/UX Designer", applicants: 28, status: "Active" },
    { title: "Backend Engineer", applicants: 60, status: "Closed" },
  ];

  const applicants = [
    { name: "Rahul Sharma", role: "Full Stack Developer", score: "82%" },
    { name: "Ananya Singh", role: "UI Designer", score: "91%" },
    { name: "Vikram Patel", role: "Backend Developer", score: "76%" },
  ];

  return (
    <div className="dashboard-wrapper">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Recruiter Dashboard</h1>
       <Link to='/post/job'> <button className="post-job-btn">+ Post New Job</button></Link>
      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>Active Jobs</h3>
          <h2>12</h2>
        </div>

        <div className="stat-card">
          <h3>Total Applicants</h3>
          <h2>248</h2>
        </div>

        <div className="stat-card">
          <h3>Interviews Scheduled</h3>
          <h2>36</h2>
        </div>

        <div className="stat-card ai-card">
          <h3>AI Match Rate</h3>
          <h2>87%</h2>
          <p>Based on ATS scoring</p>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="dashboard-main">

        {/* JOB LIST */}
        <div className="job-section">
          <h2>Your Job Posts</h2>

          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <div>
                <h4>{job.title}</h4>
                <p>{job.applicants} Applicants</p>
              </div>
              <span className={`status ${job.status}`}>
                {job.status}
              </span>
            </div>
          ))}
        </div>

        {/* APPLICANTS */}
        <div className="applicant-section">
          <h2>Recent Applicants</h2>

          {applicants.map((user, index) => (
            <div key={index} className="applicant-card">
              <div>
                <h4>{user.name}</h4>
                <p>{user.role}</p>
              </div>

              <div className="score">
                {user.score}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default RecruiterDashboard;
