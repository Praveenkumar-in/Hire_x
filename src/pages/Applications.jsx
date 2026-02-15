import React, { useState } from "react";
import { jobsApplied } from "../assets/assets";

const ApplicationPage = () => {

  /* ================= RESUME ================= */
  const [resume, setResume] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setResume(file.name);
  };

  /* ================= STATS ================= */
  const total = jobsApplied.length;
  const accepted = jobsApplied.filter(j => j.status === "Accepted").length;
  const rejected = jobsApplied.filter(j => j.status === "Rejected").length;
  const pending = jobsApplied.filter(j => j.status === "Pending").length;

  const getStatusClass = (status) => {
    if (status === "Accepted") return "status accepted";
    if (status === "Rejected") return "status rejected";
    return "status pending";
  };

  return (
  
    <div className="application-page">

      {/* ===== HERO HEADER ===== */}
      <div className="application-hero">
        <div className="container">
          <h2 className="fw-bold">My Applications</h2>
          <p>Track your job journey and manage your career progress 🚀</p>
        </div>
      </div>

      <div className="container py-5">

        {/* ===== STATS ===== */}
        <div className="row g-4 mb-4">

          <Stat title="Total Applied" value={total} icon="bi-briefcase"/>
          <Stat title="Pending" value={pending} icon="bi-hourglass"/>
          <Stat title="Accepted" value={accepted} icon="bi-check-circle"/>
          <Stat title="Rejected" value={rejected} icon="bi-x-circle"/>

        </div>

        <div className="row g-4">

          {/* ===== RESUME CARD ===== */}
          <div className="col-lg-4">

            <div className="resume-card">

              <h5 className="mb-3">Resume Manager</h5>

              <label className="upload-area">

                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleUpload}
                />

                {!resume ? (
                  <>
                    <i className="bi bi-cloud-arrow-up"></i>
                    <p className="fw-semibold mt-2">Upload Resume</p>
                    <small>PDF / DOCX</small>
                  </>
                ) : (
                  <>
                    <i className="bi bi-file-earmark-check text-success"></i>
                    <p className="fw-semibold mt-2">{resume}</p>
                    <small className="text-success">Uploaded</small>
                  </>
                )}

              </label>

              <button className="btn btn-outline-primary w-100 mt-3">
                Edit Resume
              </button>

            </div>

          </div>

          {/* ===== APPLICATION TABLE ===== */}
          <div className="col-lg-8">

            <div className="applications-card">

              <h5 className="mb-3">Jobs Applied</h5>

              <div className="table-responsive">
                <table className="table application-table align-middle">

                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {jobsApplied.map((job, i) => (
                      <tr key={i}>

                        {/* COMPANY WITH LOGO */}
                        <td>
                          <div className="company-cell">
                            <img
                              src={job.logo}
                              alt=""
                              className="company-logo"
                            />
                            <span>{job.company}</span>
                          </div>
                        </td>

                        <td className="fw-semibold">
                          {job.title}
                        </td>

                        <td>{job.location}</td>

                        <td className="text-muted">
                          {job.date}
                        </td>

                        <td>
                          <span className={getStatusClass(job.status)}>
                            {job.status}
                          </span>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
    
  );
};

/* ===== STAT COMPONENT ===== */
const Stat = ({ title, value, icon }) => (
  <div className="col-md-3">
    <div className="stat-card">

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <small>{title}</small>
          <h3>{value}</h3>
        </div>

        <div className="stat-icon">
          <i className={`bi ${icon}`}></i>
        </div>
      </div>

    </div>
  </div>
 
);

export default ApplicationPage;
