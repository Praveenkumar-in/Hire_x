

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import "./ApplyJob.css";

// const ApplyJob = () => {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [job, setJob] = useState(null);
//   const [moreJobs, setMoreJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     // scroll to top when job changes
//     window.scrollTo(0, 0);

//     const fetchJob = async () => {
//       try {

//         setLoading(true);

//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/jobs/${id}`
//         );

//         setJob(res.data);

//         const jobsRes = await axios.get(
//           `${import.meta.env.VITE_API_URL}/jobs`
//         );

//         const filtered = jobsRes.data
//           .filter((item) => item._id !== id)
//           .slice(0, 3);

//         setMoreJobs(filtered);

//       } catch (error) {
//         console.error("Failed to fetch job", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();

//   }, [id]);

//   if (loading) {
//     return <h3 className="text-center mt-5">Loading job...</h3>;
//   }

//   if (!job) {
//     return <h3 className="text-center mt-5">Job not found</h3>;
//   }

//   return (
//     <div className="applyjob-page">

//       {/* HERO */}
//       <div className="applyjob-hero">
//         <div className="container">

//           <button
//             className="btn btn-light mb-3"
//             onClick={() => navigate(-1)}
//           >
//             ← Back
//           </button>

//           <div className="applyjob-header">

//             <img
//               src={job.company?.logo}
//               alt=""
//               className="applyjob-logo"
//             />

//             <div>

//               <h2 className="applyjob-title">
//                 {job.title}
//               </h2>

//               <p className="applyjob-company">
//                 {job.company?.name} • {job.location}
//               </p>

//               <div className="applyjob-badges">

//                 <span className="applyjob-badge level">
//                   {job.level}
//                 </span>

//                 <span className="applyjob-badge category">
//                   {job.category}
//                 </span>

//                 <span className="applyjob-badge salary">
//                   ₹{job.salary}
//                 </span>

//               </div>

//             </div>

//           </div>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="container py-5">
//         <div className="row g-4">

//           {/* LEFT */}
//           <div className="col-lg-8">

//             <div className="applyjob-card">

//               <h5 className="applyjob-section-title">
//                 Job Description
//               </h5>

//               <div
//                 className="applyjob-description"
//                 dangerouslySetInnerHTML={{
//                   __html: job.description
//                 }}
//               />

//               <h5 className="applyjob-section-title mt-4">
//                 Requirements
//               </h5>

//               <ul className="applyjob-requirements">
//                 {job.requirements?.map((req, index) => (
//                   <li key={index}>{req}</li>
//                 ))}
//               </ul>

//             </div>

//             <div className="applyjob-card mt-4">

//               <h5 className="applyjob-section-title">
//                 About Company
//               </h5>

//               <div className="applyjob-company-box">

//                 <img
//                   src={job.company?.logo}
//                   width="50"
//                   alt=""
//                 />

//                 <div>

//                   <h6 className="mb-0">
//                     {job.company?.name}
//                   </h6>

//                   <small className="text-muted">
//                     Innovative company building modern solutions.
//                   </small>

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* RIGHT */}
//           <div className="col-lg-4">

//             <div className="applyjob-applybox">

//               <h5 className="mb-3">
//                 Apply for this job
//               </h5>

//               <ul className="applyjob-meta">

//                 <li><strong>Location:</strong> {job.location}</li>
//                 <li><strong>Level:</strong> {job.level}</li>
//                 <li><strong>Category:</strong> {job.category}</li>
//                 <li><strong>Salary:</strong> ₹{job.salary}</li>

//               </ul>

//               <Link to="/applications">
//                 <button className="btn applyjob-btn w-100 mb-3">
//                   Apply Now
//                 </button>
//               </Link>

//               <button className="btn btn-outline-secondary w-100">
//                 Save Job
//               </button>

//             </div>

//             {/* MORE JOBS */}
//             <div className="applyjob-card mt-4">

//               <h5 className="mb-3">
//                 More Jobs
//               </h5>

//               {moreJobs.map((item) => (

//                 <Link
//                   to={`/apply-job/${item._id}`}
//                   key={item._id}
//                   className="applyjob-morejob"
//                 >

//                   <img
//                     src={item.company?.logo}
//                     width="45"
//                     alt=""
//                   />

//                   <div>

//                     <h6 className="mb-1">
//                       {item.title}
//                     </h6>

//                     <small>
//                       {item.company?.name}
//                     </small>

//                   </div>

//                 </Link>

//               ))}

//             </div>

//           </div>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default ApplyJob;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import "./ApplyJob.css";

const ApplyJob = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [job, setJob] = useState(null);
  const [moreJobs, setMoreJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const [applying, setApplying] = useState(false);

  /* ================= FETCH JOB ================= */

  useEffect(() => {

    window.scrollTo(0, 0);

    const fetchJob = async () => {
      try {

        setLoading(true);

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

  /* ================= RESUME UPLOAD ================= */

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  /* ================= APPLY JOB ================= */

 const handleApply = async () => {

  if (!resume) {
    alert("Please upload your resume");
    return;
  }

  try {

    setApplying(true);

    const formData = new FormData();

    formData.append("job", job._id);
    formData.append("applicantName", user.fullName);
    formData.append("email", user.primaryEmailAddress.emailAddress);
    formData.append("clerkUserId", user.id);
    formData.append("resume", resume);

    await axios.post(
      `${import.meta.env.VITE_API_URL}/applications`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Application submitted successfully!");
    navigate("/applications");

  } catch (error) {

    console.error("Apply error:", error.response?.data || error);

    alert(
      error.response?.data?.message ||
      "Failed to apply for job"
    );

  } finally {
    setApplying(false);
  }

};

  if (loading) {
    return <h3 className="text-center mt-5">Loading job...</h3>;
  }

  if (!job) {
    return <h3 className="text-center mt-5">Job not found</h3>;
  }

  return (
    <div className="applyjob-page">

      {/* HERO */}
      <div className="applyjob-hero">
        <div className="container">

          <button
            className="btn btn-light mb-3"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <div className="applyjob-header">

            <img
              src={job.company?.logo}
              alt=""
              className="applyjob-logo"
            />

            <div>

              <h2 className="applyjob-title">
                {job.title}
              </h2>

              <p className="applyjob-company">
                {job.company?.name} • {job.location}
              </p>

              <div className="applyjob-badges">

                <span className="applyjob-badge level">
                  {job.level}
                </span>

                <span className="applyjob-badge category">
                  {job.category}
                </span>

                <span className="applyjob-badge salary">
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

            <div className="applyjob-card">

              <h5 className="applyjob-section-title">
                Job Description
              </h5>

              <div
                className="applyjob-description"
                dangerouslySetInnerHTML={{
                  __html: job.description
                }}
              />

              <h5 className="applyjob-section-title mt-4">
                Requirements
              </h5>

              <ul className="applyjob-requirements">
                {job.requirements?.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>

            </div>

            <div className="applyjob-card mt-4">

              <h5 className="applyjob-section-title">
                About Company
              </h5>

              <div className="applyjob-company-box">

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

            <div className="applyjob-applybox">

              <h5 className="mb-3">
                Apply for this job
              </h5>

              <ul className="applyjob-meta">

                <li><strong>Location:</strong> {job.location}</li>
                <li><strong>Level:</strong> {job.level}</li>
                <li><strong>Category:</strong> {job.category}</li>
                <li><strong>Salary:</strong> ₹{job.salary}</li>

              </ul>

              {/* Resume Upload */}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="form-control mb-3"
                onChange={handleResumeChange}
              />

              <button
                className="btn applyjob-btn w-100 mb-3"
                onClick={handleApply}
                disabled={applying}
              >
                {applying ? "Applying..." : "Apply Now"}
              </button>

              <button className="btn btn-outline-secondary w-100">
                Save Job
              </button>

            </div>

            {/* MORE JOBS */}
            <div className="applyjob-card mt-4">

              <h5 className="mb-3">
                More Jobs
              </h5>

              {moreJobs.map((item) => (

                <Link
                  to={`/apply-job/${item._id}`}
                  key={item._id}
                  className="applyjob-morejob"
                >

                  <img
                    src={item.company?.logo}
                    width="45"
                    alt=""
                  />

                  <div>

                    <h6 className="mb-1">
                      {item.title}
                    </h6>

                    <small>
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