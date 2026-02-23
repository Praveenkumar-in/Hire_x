import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminApplications.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminApplications = () => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    try {

      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${API_URL}/admin/applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setApplications(res.data);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  if (loading) {
    return <div className="admin-loading">Loading applications...</div>;
  }

  return (
  <div className="admin-applications">

    <h2 className="admin-title">
      Admin Applications Dashboard
    </h2>

    <div className="admin-card">

      <table className="admin-table">

        <thead>
          <tr>
            <th>Candidate</th>
            <th>Email</th>
            <th>Job</th>
            <th>Company</th>
            <th>ATS</th>
            <th>Status</th>
            <th>Resume</th>
          </tr>
        </thead>

        <tbody>

          {applications.map((app)=>(
            <tr key={app._id}>

              <td>{app.applicantName}</td>

              <td>{app.email}</td>

              <td>{app.job?.title}</td>

              <td>{app.job?.company?.name}</td>

              <td>
                <span className="ats-score">
                  {app.atsScore}
                </span>
              </td>

              <td>
                <span className={`status ${app.status}`}>
                  {app.status}
                </span>
              </td>

              <td>
                <a
                  href={app.resumeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-btn"
                >
                  View Resume
                </a>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  </div>
)
};

export default AdminApplications;