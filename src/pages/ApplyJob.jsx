import React from "react";
import { useParams } from "react-router-dom";
import { jobsData } from "../assets/assets"; // adjust path

const ApplyJob = () => {

  const { id } = useParams();

  const job = jobsData.find((item) => item._id === id);

  if (!job) {
    return <h3 className="text-center mt-5">Job not found</h3>;
  }

  return (
    <div className="container py-5">

      <div className="row">

        {/* LEFT SIDE */}
        <div className="col-lg-8">

          {/* Job Header */}
          <div className="apply-job-header p-4 mb-4">

            <div className="d-flex align-items-center gap-3">
              <img
                src={job.companyId.image}
                alt=""
                width="60"
              />

              <div>
                <h3 className="mb-1">{job.title}</h3>
                <p className="text-muted mb-0">
                  {job.companyId.name} • {job.location}
                </p>
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="apply-job-content p-4">

            <h5 className="mb-3">Job Description</h5>

            <div
              className="job-description"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-4">

          <div className="apply-box p-4">

            <h5>Apply for this job</h5>

            <p className="text-muted small">
              Salary: ${job.salary}
            </p>

            <button className="btn btn-primary w-100 mb-3">
              Apply Now
            </button>

            <button className="btn btn-outline-secondary w-100">
              Save Job
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ApplyJob;
