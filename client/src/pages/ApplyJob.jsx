

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ApplyJob = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [moreJobs, setMoreJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchJob = async () => {
      try {

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/jobs/${id}`
        );

        setJob(res.data);

        const jobsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/jobs`
        );

        const filtered = jobsRes.data
          .filter((item) => item._id !== id)
          .slice(0, 3);

        setMoreJobs(filtered);

      } catch (error) {
        console.error("Failed to fetch job", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();

  }, [id]);

  if (loading) {
    return (
      <h3 className="text-center mt-5">
        Loading job...
      </h3>
    );
  }

  if (!job) {
    return (
      <h3 className="text-center mt-5">
        Job not found
      </h3>
    );
  }

  return (
    <div className="apply-job-page">

      {/* HERO */}
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
              src={job.company?.logo}
              alt=""
              className="company-logo"
            />

            <div>

              <h2 className="fw-bold mb-1">
                {job.title}
              </h2>

              <p className="text-muted mb-2">
                {job.company?.name} • {job.location}
              </p>

              <div className="d-flex flex-wrap gap-2">

                <span className="badge level-badge">
                  {job.level}
                </span>

                <span className="badge category-badge">
                  {job.category}
                </span>

                <span className="badge salary-badge">
                  ₹{job.salary}
                </span>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="container py-5">
        <div className="row g-4">

          {/* LEFT */}
          <div className="col-lg-8">

            <div className="apply-card p-4 mb-4">

              <h5 className="section-title">
                Job Description
              </h5>

           <div
  className="job-description mb-4"
  dangerouslySetInnerHTML={{
    __html: job.description
  }}
/>

<h5 className="section-title mt-4">
Requirements
</h5>

<ul className="job-requirements">
  {job.requirements?.map((req, index) => (
    <li key={index}>{req}</li>
  ))}
</ul>
            </div>

            <div className="apply-card p-4">

              <h5 className="section-title">
                About Company
              </h5>

              <div className="d-flex gap-3 align-items-center">

                <img
                  src={job.company?.logo}
                  width="50"
                  alt=""
                />

                <div>

                  <h6 className="mb-0">
                    {job.company?.name}
                  </h6>

                  <small className="text-muted">
                    Innovative company building modern solutions.
                  </small>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="col-lg-4">

            <div className="apply-box mb-4">

              <h5 className="mb-3">
                Apply for this job
              </h5>

              <ul className="job-meta">

                <li>
                  <strong>Location:</strong> {job.location}
                </li>

                <li>
                  <strong>Level:</strong> {job.level}
                </li>

                <li>
                  <strong>Category:</strong> {job.category}
                </li>

                <li>
                  <strong>Salary:</strong> ₹{job.salary}
                </li>

              </ul>

              <Link to="/applications">
                <button className="btn apply-btn w-100 mb-3">
                  Apply Now
                </button>
              </Link>

              <button className="btn btn-outline-secondary w-100">
                Save Job
              </button>

            </div>

            {/* MORE JOBS */}

            <div className="apply-card p-4">

              <h5 className="mb-3">
                More Jobs
              </h5>

              {moreJobs.map((item) => (

                <Link
                  to={`/apply-job/${item._id}`}
                  key={item._id}
                  className="more-job-item d-flex gap-3 align-items-center text-decoration-none"
                >

                  <img
                    src={item.company?.logo}
                    width="45"
                    className="rounded"
                    alt=""
                  />

                  <div>

                    <h6 className="mb-1 text-dark">
                      {item.title}
                    </h6>

                    <small className="text-muted">
                      {item.company?.name}
                    </small>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default ApplyJob;