
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const API_URL = import.meta.env.VITE_API_URL;

// const RecruiterDashboard = () => {
//   const navigate = useNavigate();

//   const [jobs, setJobs] = useState([]);
//   const [applicants, setApplicants] = useState([]);
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);

//   // ================= DASHBOARD DATA =================
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const token = localStorage.getItem("recruiterToken");

//         if (!token) {
//           toast.error("Session expired. Please login again.");
//           navigate("/recruiter/login");
//           return;
//         }

//         const res = await axios.get(
//           `${API_URL}/recruiter/dashboard`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = res.data;

//         setApplicants(data.recentApplicants || []);

//         setStats({
//           activeJobs: data.totalJobs,
//           totalApplicants: data.totalApplications,
//           interviews: data.accepted,
//           aiMatchRate: data.avgAtsScore,
//         });

//       } catch (err) {
//         console.log("Dashboard Error:", err);
//         toast.error(
//           err.response?.data?.message || "Failed to load dashboard"
//         );
//       }
//     };

//     fetchDashboard();
//   }, [navigate]);

//   // ================= FETCH JOBS =================
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const token = localStorage.getItem("recruiterToken");

//         const res = await axios.get(
//           `${API_URL}/recruiter/jobs`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("Jobs API:", res.data);

//         // API returns array directly
//         setJobs(res.data || []);

//       } catch (err) {
//         console.log(err);
//         toast.error("Failed to fetch jobs");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // ================= UPDATE APPLICATION STATUS =================
//   const updateStatus = async (applicationId, newStatus) => {
//     try {
//       const token = localStorage.getItem("recruiterToken");

//       await axios.patch(
//         `${API_URL}/applications/${applicationId}/status`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setApplicants((prev) =>
//         prev.map((app) =>
//           app._id === applicationId
//             ? { ...app, status: newStatus }
//             : app
//         )
//       );

//       toast.success(`Application ${newStatus}`);
//     } catch (err) {
//       console.log(err.response);
//       toast.error("Failed to update status");
//     }
//   };

//   // ================= TOGGLE JOB STATUS =================
//   const toggleJobStatus = async (jobId) => {
//     try {
//       const token = localStorage.getItem("recruiterToken");

//       await axios.patch(
//         `${API_URL}/recruiter/${jobId}/status`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setJobs((prev) =>
//         prev.map((job) =>
//           job._id === jobId
//             ? { ...job, isActive: !job.isActive }
//             : job
//         )
//       );

//       toast.success("Job status updated");

//     } catch (err) {
//       console.log(err.response);
//       toast.error("Failed to update job status");
//     }
//   };

//   if (loading) {
//     return <div style={{ padding: "40px" }}>Loading dashboard...</div>;
//   }

//   return (
//     <div className="dashboard-wrapper">

//       {/* HEADER */}
//       <div className="dashboard-header">
//         <h1>Recruiter Dashboard</h1>

//         <Link to="/post/job">
//           <button className="post-job-btn">
//             + Post New Job
//           </button>
//         </Link>
//       </div>

//       {/* ================= STATS ================= */}
//       <div className="stats-grid">

//         <div className="stat-card">
//           <h3>Active Jobs</h3>
//           <h2>{stats.activeJobs || 0}</h2>
//         </div>

//         <div className="stat-card">
//           <h3>Total Applicants</h3>
//           <h2>{stats.totalApplicants || 0}</h2>
//         </div>

//         <div className="stat-card">
//           <h3>Interviews</h3>
//           <h2>{stats.interviews || 0}</h2>
//         </div>

//         <div className="stat-card ai-card">
//           <h3>AI Match Rate</h3>
//           <h2>{stats.aiMatchRate || 0}%</h2>
//           <p>Based on ATS scoring</p>
//         </div>

//       </div>

//       {/* ================= MAIN GRID ================= */}
//       <div className="dashboard-main">

//         {/* JOB SECTION */}
//         <div className="job-section">
//           <h2>Your Job Posts</h2>

//           {jobs.length === 0 && <p>No jobs posted yet.</p>}

//           {jobs.map((job) => (
//             <div key={job._id} className="job-card">

//               <div>
//                 <h4>{job.title}</h4>
//               </div>

//               <button
//                 className={`status-btn ${job.isActive ? "active" : "inactive"}`}
//                 onClick={() => toggleJobStatus(job._id)}
//               >
//                 {job.isActive ? "Active" : "Closed"}
//               </button>

//             </div>
//           ))}
//         </div>

//         {/* APPLICANTS */}
//         <div className="applicant-section">

//           <h2>Recent Applicants</h2>

//           {applicants.length === 0 && <p>No applicants yet.</p>}

//           {applicants.map((app) => (

//             <div key={app._id} className="applicant-card">

//               <div>
//                 <h4>{app.applicantName}</h4>
//                 <p>{app.job?.title}</p>
//               </div>

//               <div className="d-flex align-items-center gap-3">

//                 <div className="score">
//                   {app.atsScore || 0}
//                 </div>

//                 <div className="dropdown">

//                   <button
//                     className={`status-btn ${app.status?.toLowerCase()}`}
//                     data-bs-toggle="dropdown"
//                   >
//                     {app.status}
//                   </button>

//                   <ul className="dropdown-menu dropdown-menu-end">

//                     <li>
//                       <button
//                         className="dropdown-item text-success"
//                         onClick={() => updateStatus(app._id, "Accepted")}
//                       >
//                         ✅ Accept
//                       </button>
//                     </li>

//                     <li>
//                       <button
//                         className="dropdown-item text-danger"
//                         onClick={() => updateStatus(app._id, "Rejected")}
//                       >
//                         ❌ Reject
//                       </button>
//                     </li>

//                     <li>
//                       <button
//                         className="dropdown-item"
//                         onClick={() => updateStatus(app._id, "Review")}
//                       >
//                         ⏳ Review
//                       </button>
//                     </li>

//                   </ul>

//                 </div>

//               </div>

//             </div>

//           ))}

//         </div>

//       </div>

//     </div>
//   );
// };

// export default RecruiterDashboard;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./RecruiterDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

const RecruiterDashboard = () => {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);


  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("recruiterToken");
    toast.success("Logged out successfully");
    navigate("/recruiter/login");
  };


  /* ================= DASHBOARD ================= */

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const token = localStorage.getItem("recruiterToken");

        if (!token) {
          navigate("/recruiter/login");
          return;
        }

        const res = await axios.get(
          `${API_URL}/recruiter/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const data = res.data;

        setApplicants(data.recentApplicants || []);

        setStats({
          activeJobs: data.totalJobs,
          totalApplicants: data.totalApplications,
          interviews: data.accepted,
          aiMatchRate: data.avgAtsScore
        });

      } catch (err) {
        toast.error("Dashboard load failed");
      }

    };

    fetchDashboard();

  }, [navigate]);


  /* ================= FETCH JOBS ================= */

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const token = localStorage.getItem("recruiterToken");

        const res = await axios.get(
          `${API_URL}/recruiter/jobs`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setJobs(res.data || []);

      } catch (err) {

        toast.error("Failed to fetch jobs");

      } finally {

        setLoading(false);

      }

    };

    fetchJobs();

  }, []);
  // ================= UPDATE APPLICATION STATUS =================
  const updateStatus = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem("recruiterToken");

      await axios.patch(
        `${API_URL}/applications/${applicationId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplicants((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status: newStatus }
            : app
        )
      );

      toast.success(`Application ${newStatus}`);
    } catch (err) {
      console.log(err.response);
      toast.error("Failed to update status");
    }
  };


  /* ================= DELETE JOB ================= */

  const deleteJob = async (jobId) => {

    if (!window.confirm("Delete this job?")) return;

    try {

      const token = localStorage.getItem("recruiterToken");

      await axios.delete(
        `${API_URL}/jobs/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setJobs(prev => prev.filter(job => job._id !== jobId));

      toast.success("Job deleted");

    } catch (err) {

      toast.error("Failed to delete job");

    }

  };


  /* ================= TOGGLE JOB ================= */

  const toggleJobStatus = async (jobId) => {

    try {

      const token = localStorage.getItem("recruiterToken");

      await axios.patch(
        `${API_URL}/recruiter/${jobId}/status`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setJobs(prev =>
        prev.map(job =>
          job._id === jobId
            ? { ...job, isActive: !job.isActive }
            : job
        )
      );

      toast.success("Job status updated");

    } catch (err) {

      toast.error("Status update failed");

    }

  };


  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }


  return (

    <div className="dashboard-wrapper">


      {/* HEADER */}

      <div className="dashboard-header">

        <h1>Recruiter Dashboard</h1>

        <div className="header-actions">

          <Link to="/post/job">
            <button className="post-job-btn">
              + Post Job
            </button>
          </Link>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>

      </div>


      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Active Jobs</h3>
          <h2>{stats.activeJobs || 0}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Applicants</h3>
          <h2>{stats.totalApplicants || 0}</h2>
        </div>

        <div className="stat-card">
          <h3>Interviews</h3>
          <h2>{stats.interviews || 0}</h2>
        </div>

        <div className="stat-card ai-card">
          <h3>AI Match Rate</h3>
          <h2>{stats.aiMatchRate || 0}%</h2>
          <p>Based on ATS scoring</p>
        </div>

      </div>


      {/* MAIN GRID */}

      <div className="dashboard-main">


        {/* JOB SECTION */}

        <div className="job-sections">

          <h2>Your Job Posts</h2>

          {jobs.length === 0 && <p>No jobs posted yet.</p>}

          {jobs.map(job => (

            <div key={job._id} className="job-cards">

              <div className="job-info">
                <h4>{job.title}</h4>
              </div>

              <div className="job-actions">

                <button
                  className={`status-btn ${job.isActive ? "active" : "inactive"}`}
                  onClick={() => toggleJobStatus(job._id)}
                >
                  {job.isActive ? "Active" : "Closed"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* APPLICANTS */}

        {/* <div className="applicant-section">

          <h2>Recent Applicants</h2>

          {applicants.map(app => (

            <div key={app._id} className="applicant-card">

              <div>
                <h4>{app.applicantName}</h4>
                <p>{app.job?.title}</p>
              </div>

              <div className="score">
                {app.atsScore || 0}
              </div>

            </div> */}
             <div className="applicant-sections">

          <h2>Recent Applicants</h2>

           {applicants.length === 0 && <p>No applicants yet.</p>}

           {applicants.map((app) => (
            <div key={app._id} className="applicant-card">

              <div>
                <h4>{app.applicantName}</h4>
                <p>{app.job?.title}</p>
              </div>

              <div className="d-flex align-items-center gap-3">

                <div className="score">
                  {app.atsScore || 0}
                </div>

                <div className="dropdown">

                  <button
                    className={`status-btn ${app.status?.toLowerCase()}`}
                    data-bs-toggle="dropdown"
                  >
                    {app.status}
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">

                    <li>
                      <button
                        className="dropdown-item text-success"
                        onClick={() => updateStatus(app._id, "Accepted")}
                      >
                        ✅ Accept
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => updateStatus(app._id, "Rejected")}
                      >
                        ❌ Reject
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => updateStatus(app._id, "Review")}
                      >
                        ⏳ Review
                      </button>
                    </li>

                </ul>

                 </div>

               </div>

             </div>

          ))}

        </div>


      </div>

    </div>

  );

};

export default RecruiterDashboard;