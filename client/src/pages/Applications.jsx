

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import "./application.css";
const ApplicationPage = () => {

  const { user } = useUser();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH APPLICATIONS ================= */

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/applications/my/${user.id}`
        );

        setApplications(res.data.applications);

      } catch (error) {
        console.error("Failed to fetch applications", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchApplications();

  }, [user]);

  /* ================= STATS ================= */

  const total = applications.length;

  const accepted = applications.filter(
    a => a.status === "Accepted"
  ).length;

  const rejected = applications.filter(
    a => a.status === "Rejected"
  ).length;

  const pending = applications.filter(
    a => a.status === "Pending"
  ).length;

  const getStatusClass = (status) => {
    if (status === "Accepted") return "status accepted";
    if (status === "Rejected") return "status rejected";
    return "status pending";
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading applications...</h3>;
  }

  return (

    <div className="application-page">

      {/* HERO */}
      <div className="application-hero">
        <div className="container">
          <h2 className="fw-bold">My Applications</h2>
          <p>Track your job journey 🚀</p>
        </div>
      </div>

      <div className="container py-5">

        {/* STATS */}
        <div className="row g-4 mb-4">

          <Stat title="Total Applied" value={total} icon="bi-briefcase"/>
          <Stat title="Pending" value={pending} icon="bi-hourglass"/>
          <Stat title="Accepted" value={accepted} icon="bi-check-circle"/>
          <Stat title="Rejected" value={rejected} icon="bi-x-circle"/>

        </div>

        {/* APPLICATION TABLE */}
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

                {applications.map((app) => (

                  <tr key={app._id}>

                    <td>
                      <div className="company-cell">

                        <img
                          src={app.job?.company?.logo}
                          alt=""
                          className="company-logo"
                        />

                        <span>
                          {app.job?.company?.name}
                        </span>

                      </div>
                    </td>

                    <td className="fw-semibold">
                      {app.job?.title}
                    </td>

                    <td>
                      {app.job?.location}
                    </td>

                    <td className="text-muted">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <span className={getStatusClass(app.status)}>
                        {app.status}
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