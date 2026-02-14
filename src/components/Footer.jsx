import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-light border-top mt-5 pt-5">
        <div className="container">

          {/* ===== TOP FOOTER ===== */}
          <div className="row gy-4">

            {/* BRAND */}
            <div className="col-lg-4 col-md-6">
              <h5 className="fw-bold mb-2">
                <i className="bi bi-briefcase-fill text-primary me-2"></i>
                𝐇𝐢𝐫𝐞_𝐱
              </h5>
              <p className="text-muted small">
                Discover thousands of job opportunities from top companies.
                Build your career faster with InsiderJobs.
              </p>

              {/* SOCIAL */}
              <div className="d-flex gap-3 mt-3">
                {["facebook", "twitter", "linkedin", "instagram"].map(icon => (
                  <a key={icon} href="#" className="footer-icon fs-5 text-muted">
                    <i className={`bi bi-${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="col-lg-2 col-md-6">
              <h6 className="fw-semibold mb-3">Quick Links</h6>
              <ul className="list-unstyled small">
                <li><a href="#" className="footer-link">Home</a></li>
                <li><a href="#" className="footer-link">Browse Jobs</a></li>
                <li><a href="#" className="footer-link">Companies</a></li>
                <li><a href="#" className="footer-link">Career Tips</a></li>
              </ul>
            </div>

            {/* JOB CATEGORIES */}
            <div className="col-lg-3 col-md-6">
              <h6 className="fw-semibold mb-3">Top Categories</h6>
              <ul className="list-unstyled small">
                <li><a href="#" className="footer-link">Programming</a></li>
                <li><a href="#" className="footer-link">Design</a></li>
                <li><a href="#" className="footer-link">Marketing</a></li>
                <li><a href="#" className="footer-link">Cybersecurity</a></li>
              </ul>
            </div>

            {/* CONTACT + APP */}
            <div className="col-lg-3 col-md-6">
              <h6 className="fw-semibold mb-3">Get in Touch</h6>
              <p className="small text-muted mb-2">
                <i className="bi bi-envelope me-2"></i>
                support@Hire_X.com
              </p>
              <p className="small text-muted mb-3">
                <i className="bi bi-geo-alt me-2"></i>
                Bangalore, India
              </p>

              <div className="d-flex gap-2">
                <button className="btn btn-outline-dark btn-sm">
                  <i className="bi bi-google-play me-1"></i>
                  Play Store
                </button>
                <button className="btn btn-outline-dark btn-sm">
                  <i className="bi bi-apple me-1"></i>
                  App Store
                </button>
              </div>
            </div>

          </div>

          {/* ===== TRUST BAR ===== */}
          <div className="row mt-4 text-center">
            <div className="col">
              <small className="text-muted">
                Trusted by <strong>5,000+</strong> companies worldwide
              </small>
            </div>
          </div>

          {/* ===== BOTTOM FOOTER ===== */}
          <div className="border-top mt-4 pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center small text-muted">
            <span>
              © {new Date().getFullYear()} 𝐇𝐢𝐫𝐞_𝐱. All rights reserved.
            </span>
            <span className="mt-2 mt-md-0">
              Privacy Policy · Terms · Cookies
            </span>
          </div>
        </div>
      </footer>

      {/* ===== SCROLL TO TOP ===== */}
      <button
        className="btn btn-primary scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="bi bi-arrow-up"></i>
      </button>

      {/* ===== STYLES ===== */}
      <style>
        {`
          .footer-link {
            color: #6c757d;
            text-decoration: none;
          }

          .footer-link:hover {
            color: #0d6efd;
          }

          .footer-icon:hover {
            color: #0d6efd;
            transform: translateY(-2px);
            transition: all 0.3s ease;
          }

          .scroll-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            border-radius: 50%;
            padding: 10px 14px;
            z-index: 999;
          }
        `}
      </style>
    </>
  );
};

export default Footer;