import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobsData } from "../assets/assets";

const ApplyJob = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobsData.find(
    (item) => item._id.toString() === id
  );

  if (!job) {
    return (
      <h3 className="text-center mt-5">
        Job not found
      </h3>
    );
  }

  return (
    <div className="apply-job-page">

      {/* ===== HERO HEADER ===== */}
      <div className="apply-hero">
        <div className="container">

          <button
            className="btn btn-light mb-3"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <div className="d-flex align-items-center gap-3 flex-wrap">

            <img
              src={job.companyId.image}
              alt=""
              className="company-logo"
            />

            <div>
              <h2 className="fw-bold mb-1">{job.title}</h2>

              <p className="text-muted mb-2">
                {job.companyId.name} • {job.location}
              </p>

              <div className="d-flex flex-wrap gap-2">
                <span className="badge level-badge">
                  {job.level}
                </span>

                <span className="badge category-badge">
                  {job.category}
                </span>

                <span className="badge salary-badge">
                  ${job.salary}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container py-5">
        <div className="row g-4">

          {/* LEFT CONTENT */}
          <div className="col-lg-8">

            <div className="apply-card p-4 mb-4">
              <h5 className="section-title">
                Job Description
              </h5>

              <div
                className="job-description"
                dangerouslySetInnerHTML={{
                  __html: job.description
                }}
              />
            </div>

            {/* COMPANY SECTION */}
            <div className="apply-card p-4">
              <h5 className="section-title">
                About Company
              </h5>

              <div className="d-flex gap-3 align-items-center">
                <img
                  src={job.companyId.image}
                  width="50"
                  alt=""
                />

                <div>
                  <h6 className="mb-0">
                    {job.companyId.name}
                  </h6>
                  <small className="text-muted">
                    Innovative company building modern solutions.
                  </small>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-lg-4">

            <div className="apply-box sticky-top">

              <h5 className="mb-3">
                Apply for this job
              </h5>

              <ul className="job-meta">
                <li><strong>Location:</strong> {job.location}</li>
                <li><strong>Level:</strong> {job.level}</li>
                <li><strong>Category:</strong> {job.category}</li>
                <li><strong>Salary:</strong> ${job.salary}</li>
              </ul>

              <button className="btn apply-btn w-100 mb-3">
                Apply Now
              </button>

              <button className="btn btn-outline-secondary w-100">
                Save Job
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
